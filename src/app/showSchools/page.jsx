'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSchools } from "../schoolsProvider";


function ShowSchools() {

  const {schools} = useSchools()
  const [loading, setLoading] = useState(true)

  

  useEffect(() => {
    schools && setLoading(false);
    console.log(schools)
  }, [schools]);

  return (
    <div className="w-full p-4 min-w-[320px]">
      <ul className="min-w-[300px] flex gap-2 flex-wrap justify-center bg-slate-400 rounded-md p-4">
        {!loading? schools && schools.map(({ id, name, address, image, city }) => (
          <li
            key={id}
            className="w-1/5 min-w-[280px] p-3 bg-white rounded-md max-h-fit">
            {image && (
              <Image
                src={`/schoolImages/${image}`}
                alt={name}
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded transform scale-95 hover:scale-100 
                transition-transform duration-300 ease-in-out"
                onError={(e) => {
                  console.error('Image failed to load:', `/schoolImages/${image}`)
                  e.target.style.display = 'none'
                }}
              />
            )}
            <h1 className="lg:text-xl font-bold mb-2 p-2">{name}</h1>
            <div className={'h-32 overflow-hidden'}>
              <p className="p-2 line-clamp-2">{address}</p>
              <p className="p-2 line-clamp-1">{city}</p>
              <div className="flex items-center gap-1 p-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < 5 ? "⭐" : "☆"}</span>
                ))}
              </div>
            </div>
            <Button type='submit' className={'bg-slate-400 w-full lg:text-lg'}>Apply now</Button>
          </li>
        )) :<p className="text-lg">Loading...</p>}
      </ul>
    </div>
  )
}

export default ShowSchools