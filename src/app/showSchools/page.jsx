'use client'

import { useState, useEffect } from "react";
import { Button} from "@/components/ui/button";
import Image from "next/image";


function ShowSchools() {

  const [schools, setSchools] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/getSchools', {
        method: "GET"
      })
      const data = await res.json()
      if (data) {
        // console.log(data)
        setSchools(data)
      }

    }
    getData()

  }, [])

  useEffect(() => {
    console.log(schools);
  }, [schools]);

  return (
    <div className="w-full p-4 min-w-[320px]">
      <ul className="min-w-[300px] flex gap-2 flex-wrap justify-center bg-slate-400 rounded-md p-4">
        {schools ? schools.map(({id, name, address, image, city}) => (
          <li 
            key={id} 
            className="w-1/4 min-w-[280px] p-5 m-3 bg-white rounded-md">
            {image && (
              <Image 
                src={`/schoolImages/${image}`} 
                alt={name} 
                width={500} 
                height={300}
                className="w-full h-48 object-cover rounded"
                onError={(e) => {
                  console.error('Image failed to load:', `/schoolImages/${image}`)
                  e.target.style.display = 'none'
                }}
                />
                )}
                <h1 className="lg:text-xl font-bold mb-2">{name}</h1>
                <div className={'h-36 min-h-32'}>
                <p className="p-2">{address}</p>
                <p className="p-2">{city}</p>
                <p className="p-2">Review-5 star</p>
                </div>
                <Button type='submit' className={'bg-green-500 w-full'}>Apply now</Button>
          </li>
        )):<p>Loading....</p>}
      </ul>
    </div>
  )
}

export default ShowSchools