import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
    try {
        const pool = await getConnection();
        const [rows] = await pool.execute("SELECT id, name, address, city, image FROM schools");
        console.log('Database rows:', rows);
        console.log('Rows count:', rows.length);
        
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}