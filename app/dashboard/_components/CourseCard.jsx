import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CoursesCard = ({course}) => {
  return (
    <Link href={`/course/${course.courseId}`}>
    <div className='shadow-sm rounded-lg border p-2 hover:scale-105 transition-all cursor-pointer mt-5'>
      <Image src={course?.courseBanner} width={300} height={300} className='w-full h-[280px] object-cover'/>
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
    </Link>
  )
}

export default CoursesCard