import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

const DashboardLayout = ({children}) => {
  return (
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-black h-[100vh] w-full'>
      <div className='md:w-64 hidden md:block '>
        <SideBar/>
      </div>
        <div className='md:ml-64 '>
            <Header/>
        <div >
        {children}
        </div>
        </div>
    </div>
  )
}

export default DashboardLayout