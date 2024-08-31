import Image from 'next/image'
import React from 'react'
import {Button} from "../../components/ui/button"

const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
        <Image src={'/vercel.svg'} width={150} height={100}/>
        <Button>Add</Button>
    </div>
  )
}

export default Header