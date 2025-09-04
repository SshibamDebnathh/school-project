"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useSchools } from "../schoolsProvider"

export default function AddSchoolPage() {

  const {getData} = useSchools();
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState(null)
  const styles = "border border-black/10 text-xl placeholder:text-base placeholder:text-slate-700 focus:outline-2 focus:outline-slate-500 hover:bg-stone-300 py-6";
  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        if (value && value.length) formData.append("image", value[0])
      } else {
        formData.append(key, value)
      }
    })

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      })
      const result = await res.json()
      if (result.success) {
        await getData();
        setStatus("✅ School added successfully!")
        reset()
      } else {
        setStatus("❌ " + (result.error || "Failed to add school"))
      }
    } catch (err) {
      setStatus("❌ " + err.message)
    } finally {
      setTimeout(() => {
        setStatus(null)
      }, 3000);
    }
  }

  return (
    <div className="flex justify-center ml-2 p-4">

    <Card className="w-full max-w-md mx-auto py-10 mt-5 bg-stone-200 min-w-[320px]">
      <CardHeader>
        <CardTitle className='text-3xl text-slate-500'>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Input placeholder="School Name" className={styles} {...register("name", { required: "Name is required" })} />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          <Input placeholder="Address" className={styles} {...register("address", { required: "Address is required" })} />
          {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
          <div className="flex flex-row gap-2">
            <Input placeholder="City" className={styles} {...register("city", { required: "City is required" })} />
            {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
            <Input placeholder="State" className={styles} {...register("state", { required: "State is required" })} />
            {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
          </div>
          <Input type="tel" placeholder="Contact" className={styles} {...register("contact", {
            required: "Contact is required",
            pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" }
          })} />
          {errors.contact && <p className="text-red-500 text-xs">{errors.contact.message}</p>}
          <Input type="email" placeholder="Email" className={styles} {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/, message: "Invalid email format" }
          })} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          <Input type="file" accept="image/*" className={'file:bg-slate-500 file:rounded-full file:text-white file:mr-4 file:cursor-pointer file:text-base'} {...register("image", { required: "Image is required" })} />
          {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}

          <Button type="submit" className="w-full bg-slate-500 text-white">Submit</Button>
        </form>

        {status && <p className="mt-4 text-center text-base">{status}</p>}
      </CardContent>
    </Card>
    </div>

  )
}
