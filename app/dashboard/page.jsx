"use client"
import React, { useEffect, useState } from 'react'
import AddCourse from './_components/AddCourse'
import CoursessList from './_components/CoursessList'


const Dashboard = () => {
  
  return (
    <div className='p-20 tailwind-scrollbar'>
        <AddCourse/>
        <CoursessList/>
    </div>
  )
}

export default Dashboard