'use client'

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu } from 'lucide-react';

function Navbar() {
    const [sidebar,setSidebar] = React.useState(false)


    
    return (
        <>
         {sidebar && (<ul className={'w-3/4 right-0 top-20 backdrop-blur-sm bg-slate-600 visible sm:hidden min-h-screen absolute flex flex-col space-y-10 font-medium items-center justify-center z-10 text-white rounded text-2xl'} onClick={(e)=>{
            if(e.target.nodeName==='A'){
            setSidebar(false)
            }
            }}>
            <Link href={"/"}>Home</Link>
                <Link href={"/showSchools"}>Schools</Link>
                <Link href={"/addSchool"}>Register</Link>
                <Link href={"#"}>Testimonials</Link>
            </ul>)}
        <nav
            className='bg-slate-500 w-full min-w-[320px] flex justify-between rounded-md py-4 sm:px-3 items-center'>
            <div className={'invisible overflow-x-hidden sm:visible space-x-5 text-white lg:text-lg font-semibold'}>
                <Link href={"/"}>Home</Link>
                <Link href={"/showSchools"}>Schools</Link>
                <Link href={"/addSchool"}>Register</Link>
                <Link href={"#"}>Testimonials</Link>
            </div>
            
            <div className='invisible sm:visible flex gap-2'>
                <Button className='bg-slate-400 text-white'>Signup</Button>
                <Button className={'bg-white'}>Login</Button>
            </div>
            <Menu className={'min-w-16 min-h-16 sm:hidden right-5 sticky top-6 text-white'} onClick={()=>{setSidebar(!sidebar)}}/>
              
                
        </nav>
       
        </>
    )
}

export default Navbar