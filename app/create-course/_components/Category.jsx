import { UserInputContext } from '@/app/_context/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

const Category = () => {
    const {userCourseInput , setUserCourseInput} = useContext(UserInputContext)

    const handleCategoryChange = (category) => {
        setUserCourseInput(prev => ({
            ...prev , 
            category:category
        }))
    }


  return (<div className='md:px-20 mt-10'> 
    <h2 className='my-5'>Select the coarse Category</h2>
    <div className='grid grid-cols-3 gap-10 '>
        {
           CategoryList.map((item , index)=>(
            <div className={`flex flex-col p-5 border items-center rounded-xl hover:border-gray-50 hover:bg-gray-100 cursor-pointer ${userCourseInput?.category === item.name && 'border-gray-400 bg-gray-50'}`} onClick={()=>handleCategoryChange(item.name)}>
                <Image src={item.icon} width={50} height={50}/>
                <div>{item.name}</div>
            </div>
           )) 
        }
    </div>
  </div>
  )
}

export default Category