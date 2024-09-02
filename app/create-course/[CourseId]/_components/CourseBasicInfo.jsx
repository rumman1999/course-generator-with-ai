import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiAcademicCap } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";

const CourseBasicInfo = ({ course , refreshData}) => {
  const [selectedFile , setSelectedFile ] = useState("/business-development.gif")

  const onFileSelected = (e) => {
    const file = e.target.files[0]
    setSelectedFile(URL.createObjectURL(file))
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
            <Image src={selectedFile} width={300} height={300} className="w-full rounded-xl h-[250px] object-cover"/>
            </label>
            <input type="file" id="image-upload" className="opacity-0" onChange={(e)=>onFileSelected(e)}/>
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
