import React from 'react'
import YouTube from 'react-youtube'

const ChapterContent = ({content , course , selectedChapter}) => {
    // console.log(course)

    const opts = {
        width : '620',
        height : '400',
        playerVars : {
            autoplay : 0
        }
    }

  return (
    <div className='p-10 max-h-[100vh] overflow-y-auto scrollbar-custom'>
        <h2 className='font-medium text-2xl mb-2'>{selectedChapter?.name}</h2>
        <p className='text-gray-400 mb-3'>{selectedChapter?.about}</p>
        <div className='flex justify-center items-center my-1'>
        <YouTube videoId={content?.videoId} opts={opts}/>
        </div>
        <div>
            {
                content?.content?.map((item , index)=>(
                    <div className='p-5 rounded-lg border-gray-50'>
                        <h2 className='font-medium text-lg'>
                            {item?.title}
                        </h2>
                        <p>{item.description}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ChapterContent