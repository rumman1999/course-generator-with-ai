import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-5 shadow-md '>
        <Image src={'/logo1.png'} alt='Vercel Logo' width={100} height={60}/>
        <UserButton/>
    </div>
  )
}

export default Header