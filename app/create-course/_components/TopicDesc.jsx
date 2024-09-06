import { UserInputContext } from '@/app/_context/UserInputContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

const TopicDesc = () => {
    const {userCourseInput , setUserCourseInput} = useContext(UserInputContext)

    const handleCategoryChange = (fieldName , fieldValue) => {
        setUserCourseInput(prev => ({
            ...prev , 
            [fieldName] : fieldValue
        }))
    }

  return (
    <div className=' w-[600px] m-auto text-gray-300 text-2xl gap-5'>
        {/* input */}
        <div className='mt-5 w-1/2'>
            <label > Write the topic here </label>
            <Input className="bg-slate-400 text-gray-900" placeholder={"Topic"} defaultValue={userCourseInput.topic} onChange={(e => handleCategoryChange('topic' , e.target.value))}/>
        </div>
        {/* text area */}
        <div className='mt-5'>
            <label>Tell us more about your code , what you wanna include </label>
            <Textarea className="bg-slate-400 text-gray-900 height-[300px]" placeholder={"About your course"} defaultValue={userCourseInput.desc} onChange={(e =>handleCategoryChange('desc' , e.target.value))}/>
        </div>
    </div>
  )
}

export default TopicDesc