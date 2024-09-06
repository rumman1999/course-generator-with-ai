"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { HiAcademicCap } from 'react-icons/hi2';

const Course = ({params}) => {
  console.log(params.courseId)

    const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(()=>{
    params && GetCourse
  },[params])

    const GetCourse = async () => {
        const result = await db
          .select()
          .from(CourseList)
          console.log(result)
        setCourse(result[0]);
      };

      console.log(course)
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black  w-full h-auto px-7 md:px-20 lg:px-44 text-gray-300 min-h-[100vh] p-10 border rounded-xl shadow-sm mt-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <h2 className="font-bold text-2xl">{course?.courseOutput?.course?.name}</h2>
        <p className="text-sm text-gray-400 mt-3">{course?.courseOutput?.course?.description}</p>
        <h2 className="font-medium mt-2 flex gap-2 items-center"><HiAcademicCap /> {course?.category}</h2>
    <Button className="w-full mt-5">Start</Button>
      </div>
      <div>
          <label htmlFor="image-upload">
          {/* <Image src={''} width={300} height={300} className="w-full rounded-xl h-[250px] object-cover" alt="banner"/> */}
          </label>
      </div>
    </div>
  </div>
  )
}

export default Course