import Image from 'next/image'
import React from 'react'
import {Button} from "../../components/ui/button"

const Header = () => {
  return (
    <div className='flex justify-between px-5 shadow-sm h-[100px] items-center'>
        <Image src={'/logo1.png'} width={150} height={100}/>
        {/* <Button href="/dashboard">Add</Button> */}
        <div className='h-1/2'>
        <a
          className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/dashboard"
        >
          Click here to Get Started
        </a>
        </div>
    </div>
  )
}

export default Header