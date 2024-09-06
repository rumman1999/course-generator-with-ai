"use client"
import React, { useState } from 'react'
import { UserInputContext } from '../_context/UserInputContext'
import Header from '../dashboard/_components/Header'

const CreateCourseLayout = ({children}) => {
  const [userCourseInput , setUserCourseInput] = useState({})
  return (
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-black  w-full h-100vh-or-auto'>
      <UserInputContext.Provider value={{
        userCourseInput , setUserCourseInput
      }}>
        <>
        <Header/>
        {children}
        </>
        </UserInputContext.Provider>
    </div>
  )
}

export default CreateCourseLayout;