import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { CourseList } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/config/db'
import CoursesCard from './CourseCard'

const CoursessList = () => {
    const {user} = useUser();
  const [courseList , setCourseList] = useState([])

  useEffect(()=>{
    if(user?.primaryEmailAddress?.emailAddress)
    getCourseList();
  } , [user])

  const getCourseList = async() => {
    const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy , user?.primaryEmailAddress?.emailAddress))
    setCourseList(result)
  }
  return (
    <div className='mt-10'>
        <h2 className='font-medium text-xl'>My AI Courses</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-10'>
            {
                courseList?.map((course , index)=>(
                    <CoursesCard course={course} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default CoursessList