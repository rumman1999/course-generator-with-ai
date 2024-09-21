"use client"
import React, { useState } from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'
import { ChatBotContext } from '../_context/ChatBotContext'

const DashboardLayout = ({children}) => {
  const [chatBotMessaages , setChatBotMessages] = useState([
    {
      "content":"Hi this is Generator ChatBot , Ask me !",
      "role":"system"
    },
  ])
  return (
    <ChatBotContext.Provider value={{
      chatBotMessaages , setChatBotMessages
    }}>
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-[100vh] h-auto w-full tailwind-scrollbar'>
      <div className='md:w-64 hidden md:block '>
        <SideBar/>
      </div>
        <div className='md:ml-64 tailwind-scrollbar'>
            <Header/>
        <div >
        {children}
        </div>
        </div>
    </div>
    </ChatBotContext.Provider>
  )
}

export default DashboardLayout