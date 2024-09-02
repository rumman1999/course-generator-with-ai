"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";

const CoarseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList?.courseId, params?.CourseId),
          eq(CourseList?.createdBy, "rummanhase@gmail.com")
        )
      );
    setCourse(result[0]);
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text=2xl">CoarseLayout</h2>

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>

      {/* Course Detail */}
      <CourseDetails course={course} refreshData={()=>GetCourse()}/>
      {/* Lesson List */}
      <ChapterList course={course} refreshData={()=>GetCourse()}/>
    </div>
  );
};

export default CoarseLayout;
