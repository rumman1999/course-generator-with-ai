"use client"
import React, { useEffect, useState } from 'react'
import AddCourse from './_components/AddCourse'
import CoursessList from './_components/CoursessList'


const Dashboard = () => {
  
  return (
    <div>
        <AddCourse/>
        <CoursessList/>
    </div>
  )
}

export default Dashboard