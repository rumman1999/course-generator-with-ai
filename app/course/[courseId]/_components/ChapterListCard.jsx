import React from 'react'

const ChapterListCard = ({chapter , index , handleClick}) => {
  return (
    <div className='grid grid-cols-5 p-3 border-b border-gray-950 cursor-pointer hover:bg-gray-800' onClick={()=>handleClick(chapter , index)}>
      <div>
        <h2 className='p-1 w-8 h-8 rounded-full text-center bg-gray-950 text-gray-100'>{index+1}</h2>
      </div>
      <div className='col-span-4'>
        <h2 className='font-medium'>{chapter?.name}</h2>
        <h2 className='flex items-center gap-2 text-sm text-gray-400'>{chapter?.duration}</h2>
      </div>
    </div>
  )
}

export default ChapterListCard