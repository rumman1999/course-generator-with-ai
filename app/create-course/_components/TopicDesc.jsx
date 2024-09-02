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
    <div>
        {/* input */}
        <div className='mt-5'>
            <label> Write the topic here </label>
            <Input placeholder={"Topic"} defaultValue={userCourseInput.topic} onChange={(e => handleCategoryChange('topic' , e.target.value))}/>
        </div>
        {/* text area */}
        <div className='mt-5'>
            <label>Tell us more about your code , what you wanna include </label>
            <Textarea placeholder={"About your course"} defaultValue={userCourseInput.desc} onChange={(e =>handleCategoryChange('desc' , e.target.value))}/>
        </div>
    </div>
  )
}

export default TopicDesc