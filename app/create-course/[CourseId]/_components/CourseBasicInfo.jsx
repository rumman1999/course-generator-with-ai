import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiAcademicCap } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { eq } from "drizzle-orm";
import { CourseList } from "@/config/schema";
import { db } from "@/config/db";

const CourseBasicInfo = ({ course , refreshData}) => {
  const [selectedFile , setSelectedFile ] = useState("")
  
  useEffect(()=>{
    course?.courseBanner && setSelectedFile(course.courseBanner)
  },[course])

  const onFileSelected =async (e) => {
    const file = e.target.files[0]
    setSelectedFile(URL.createObjectURL(file))

    const fileName = Date.now()+'.jpg'
    const storageRef = ref(storage , "course-gener/"+fileName)
    await uploadBytes(storageRef , file).then((snapshot)=>{
      console.log("upload file complete")
    }).then(res=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl)
        await db.update(CourseList).set({
          courseBanner : downloadUrl
      }).where(eq(CourseList.id , course?.id))
      })
    })
  }

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-2xl">{course?.courseOutput?.course?.name} <EditCourseBasicInfo course={course} refreshData={()=>refreshData()}/></h2>
          <p className="text-sm text-gray-400 mt-3">{course?.courseOutput?.course?.description}</p>
          <h2 className="font-medium mt-2 flex gap-2 items-center"><HiAcademicCap /> {course?.category}</h2>
      <Button className="w-full mt-5">Start</Button>
        </div>
        <div>
            <label htmlFor="image-upload">
            <Image src={selectedFile} width={300} height={300} className="w-full rounded-xl h-[250px] object-cover" alt="banner"/>
            </label>
            <input type="file" id="image-upload" className="opacity-0" onChange={(e)=>onFileSelected(e)}/>
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
