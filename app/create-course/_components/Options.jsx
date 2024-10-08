import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

const Options = () => {
    const {userCourseInput , setUserCourseInput} = useContext(UserInputContext)

    const handleCategoryChange = (fieldName , fieldValue) => {
        // console.log(fieldName , fieldValue)
        setUserCourseInput(prev => ({
            ...prev , 
            [fieldName] : fieldValue
        }))
    }
  return (
    <div className="px-10 md:px-20 lg:px44 mt-10">
      <div className="grid grid-cols-2 text-gray-300 text-xl">
       <div className="mb-10">
        <label >Difficulty Level</label>
       <Select  onValueChange={(value)=>handleCategoryChange('difficultLevel' , value)} defaultValue={userCourseInput?.difficultLevel}>
          <SelectTrigger className="w-[180px] bg-slate-400 text-gray-800">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent className="bg-slate-400">
            <SelectItem value="Bigginer">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advance">Advance</SelectItem>
          </SelectContent>
        </Select>
       </div>
       <div className="mb-10">
        <label>Coarse Duration</label>
       <Select onValueChange={(value)=>handleCategoryChange('duration' , value)}
        defaultValue={userCourseInput?.duration}>
          <SelectTrigger className="w-[180px] bg-slate-400 text-gray-800">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent className="bg-slate-400">
            <SelectItem value="1 hours">1 hours</SelectItem>
            <SelectItem value="2 hours">2 hours</SelectItem>
            <SelectItem value="More than 2 hours">More than 2 hours</SelectItem>
          </SelectContent>
        </Select>
       </div>
       <div>
        <label>Ad Video</label>
       <Select onValueChange={(value)=>handleCategoryChange('add' , value)} defaultValue={userCourseInput?.add}>
          <SelectTrigger className="w-[180px] bg-slate-400 text-gray-800">
            <SelectValue placeholder="Ad" />
          </SelectTrigger>
          <SelectContent className="bg-slate-400">
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
       </div>
       <div>
        <label>No of Chapter</label>
        <Input className="w-[180px] bg-slate-400 text-gray-800" type="number" onChange={(e)=>handleCategoryChange('noOfChapter' , e.target.value)} defaultValue={userCourseInput?.noOfChapter}/>
       </div>
      </div>
      </div>

  );
};

export default Options;
//Generate a course Tutororials on Following Details with fields as Course Name ,Description, Along with Chapter Name , about , duration : Category:"Programming", Topic:"Python", Level : "basic" , Duration : "1 hours" , NoOfChapter : 5 , in JOSN format