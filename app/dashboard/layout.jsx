import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

const DashboardLayout = ({children}) => {
  return (
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-[100vh] h-auto w-full tailwind-scrollbar'>
      <div className='md:w-64 hidden md:block '>
        <SideBar/>
      </div>
        <div className='md:ml-64 tailwind-scrollbar'>
            <Header/>
        <div >
        {children}
        </div>
        </div>
    </div>
  )
}

export default DashboardLayout