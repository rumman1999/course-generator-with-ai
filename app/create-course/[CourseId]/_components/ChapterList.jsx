import React from 'react'
import { HiCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditChapterList from './EditChapterList';

const ChapterList = ({course , refreshData}) => {

  return (
    <div className='mt-3'>
        <h2 className='font-medium text-xl'>Chapters</h2>
        <div className='mt-2'>
            {
                course?.courseOutput?.course?.chapters.map((chapter , index)=>(
                    <div className='border p-5 rounded-lg mt-2 flex items-center justify-between'>
                        <div className='flex gap-5 items-center'>
                        <h2 className='flex-none h-10 w-10 text-white bg-black rounded-full text-center p-2'>{index+1}</h2>
                        <div>
                            <h2 className='font-medium text-lg'>{chapter?.name} <EditChapterList course={course} index={index} refreshData={()=>refreshData()}/></h2>
                            <p className='text-sm text-gray-600'>{chapter?.about}</p>
                            <p className='flex gap-2 items-center text-gray-400'><HiOutlineClock /> {chapter?.duration}</p>
                        </div>
                    </div>
                    <HiCheckCircle className='text-4xl text-gray-300 flex-none'/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ChapterList