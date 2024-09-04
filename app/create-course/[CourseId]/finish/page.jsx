"use client"
import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';

const FinishLayout = ({params}) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      params && GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList?.courseId, params?.CourseId),
          eq(CourseList?.createdBy, user.primaryEmailAddress.emailAddress)
        )
      );
    console.log("result", result[0]);
    setCourse(result[0]);
  };
  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
      <h2 className='text-center font-bold text-2xl my-3'>Congratulations Your Course is Ready</h2>

      
      <CourseBasicInfo course={course}/>

      <h2 className='text-center font-light text-xl my-3 border p-5 rounded'>Course URL = {process.env.NEXT_PUBLIC_HOST_URL+course?.courseId+"/"}</h2>
    </div>
  )
}

export default FinishLayout