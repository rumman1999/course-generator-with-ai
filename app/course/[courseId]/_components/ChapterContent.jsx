import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'

const ChapterContent = ({content  , selectedChapter}) => {
    const route = useRouter()
    const [videoId , setVideoId] = useState("")
    useEffect(()=>{
        setVideoId(content?.videoId)
    },[content])

    const opts = {
        width : '620',
        height : '400',
        playerVars : {
            autoplay : 0
        }
    }

  return (
    <div className='p-10 max-h-[100vh] overflow-y-auto scrollbar-custom'>
       <div className='flex justify-between items-center mb-2'>
       <h2 className='font-medium text-2xl mb-2'>{selectedChapter?.name}</h2>
       <Button onClick={()=>{route.replace("/dashboard")}} className="bg-slate-400">Back To Dashboard</Button>
       </div>
        <p className='text-gray-400 mb-3'>{selectedChapter?.about}</p>
        <div className='flex justify-center items-center my-1'>
        <YouTube videoId={videoId} opts={opts}/>
        </div>
        <div>
            {
                content?.content?.map((item , index)=>(
                    <div className='p-5 rounded-lg border-gray-50'>
                        <h2 className='font-medium text-lg'>
                            {item?.title}
                        </h2>
                        <p>{item.description}</p>
                        {
                            item.code && 
                            <div className='m-2 bg-black p-5 rounded-sm'>
                                <pre>
                                <code>{item.code}</code>
                            </pre>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ChapterContent