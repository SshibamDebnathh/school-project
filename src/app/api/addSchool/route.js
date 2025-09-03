import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { getConnection } from "@/lib/db"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export async function POST(req) {
  let conn = null
  
  try {
    const formData = await req.formData()
    console.log(formData)

    // Get text fields and validate required fields
    const name = formData.get("name")
    const address = formData.get("address")
    const city = formData.get("city")
    const state = formData.get("state")
    const contact = formData.get("contact")
    const email = formData.get("email")

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email) {
      return NextResponse.json(
        { error: "All fields are required" }, 
        { status: 400 }
      )
    }

    // Handle image with validation
    const file = formData.get("image")
    
    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "Image file is required" }, 
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" }, 
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only image files (JPEG, PNG, GIF, WebP) are allowed" }, 
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), "public/schoolImages")
    try {
      await fs.access(uploadDir)
    } catch {
      await fs.mkdir(uploadDir, { recursive: true })
    }

    // Save file with sanitized name
    const fileExtension = path.extname(file.name)
    const baseName = path.basename(file.name, fileExtension).replace(/[^a-zA-Z0-9-]/g, '_')
    const fileName = Date.now() + "_" + baseName + fileExtension
    const filePath = path.join(uploadDir, fileName)
    
    await fs.writeFile(filePath, buffer)

    // Insert into DB
    conn = await getConnection()
    await conn.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email, fileName]
    )

    return NextResponse.json({ success: true, file: fileName })
    
  } catch (err) {
    console.error("Upload error:", err)
    
    // Clean up file if DB insert failed
    if (err.message.includes('database') && fileName) {
      try {
        await fs.unlink(path.join(process.cwd(), "public/schoolImages", fileName))
      } catch (unlinkErr) {
        console.error("Failed to clean up file:", unlinkErr)
      }
    }
    
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    
  } finally {
    // Always release connection
    if (conn) {
      try {
        conn.end()
      } catch (releaseErr) {
        console.error("Failed to release connection:", releaseErr)
      }
    }
  }
}