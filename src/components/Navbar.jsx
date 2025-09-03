import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function Navbar() {
    return (
        <div
            className='bg-slate-500 w-full min-w-[320px] flex justify-between rounded-md 
                     py-4 sm:px-3 items-center'>
            <ul className={'invisible sm:visible flex sm:gap-5 text-white lg:text-lg font-semibold'}>
                <Link href={"/"}>Home</Link>
                <Link href={"/showSchools"}>Schools</Link>
                <Link href={"/addSchool"}>Register</Link>
                <Link href={"#"}>Testimonials</Link>
            </ul>
            <div className='invisible sm:visible flex gap-2'>
                <Button className='bg-slate-400 text-white'>Signup</Button>
                <Button className={'bg-white'}>Login</Button>
            </div>
        </div>
    )
}

export default Navbar