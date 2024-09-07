import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const CoursesCard = ({course}) => {
  const route = useRouter();

  const handleRoute = (e) => {
    console.log("first e")
    route.replace(`/course/${course.courseId}/start`)
    e.preventDefault()
  }

  return (
    <div onClick={(e)=>handleRoute(e)} className='shadow-sm rounded-lg border p-2 hover:scale-105 transition-all cursor-pointer'>
      <Image src={course?.courseBanner} width={150} height={150} className='w-full h-[150px] object-cover'/>
      <div className='p-2'>
        <h2 className='font-medium text-lg'>
          {course?.courseOutput?.course?.name}
        </h2>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1  text-gray-600 text-sm'>Total Chapters {course?.courseOutput?.course?.chapters.length}</h2>
          <h2  className='text-sm'>Level {course?.courseOutput?.course?.level}</h2>
        </div>
      </div>

    </div>
  )
}

export default CoursesCard