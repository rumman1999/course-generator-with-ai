"use client";
import { db } from "@/config/db";
import { Chapters, CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenearteCourseChapterContent_AI } from "@/config/AiModel";
// import LoadingDialog from "../_components/LoadingDialog";
import { getYoutubeResult } from "@/config/search";
import { useRouter } from "next/navigation";

const CoarseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // console.log(params)
    if (user?.primaryEmailAddress?.emailAddress) {
      params && GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList?.courseId, params?.CourseId),
          eq(CourseList?.createdBy, user.primaryEmailAddress.emailAddress)
        )
      );
    console.log("result", result[0]);
    setCourse(result[0]);
  };

  const GenerateCourseChaptersContent = () => {
    // setLoading(true)
    const chapetrs = course?.courseOutput?.course?.chapters;
    chapetrs.forEach(
      async (chapter, index) => {
        const PROMPT = `Explain the concept in Detail on Topic : ${course.name} : Chapter ${chapter.name} : in JSON format with list of array with field as title description in details Code Example (Code field in <precode> format) if applicable`;
        try {
          let videoid = "";
          const result =await GenearteCourseChapterContent_AI.sendMessage(PROMPT)
          const content = JSON.parse(result.response.text())
          const youtubeResults = await getYoutubeResult(course?.name + ":" + chapter?.name);
          videoid = youtubeResults[0]?.id?.videoId;
          // videoid = "mAtkPQO1FcA"

          await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            content: content,
            videoId: videoid,
          });
          await db.update(CourseList).set({
            publish : true
          })
          setLoading(false);
          router.replace("/course/" + course?.courseId + "/start");
          console.log("videoid", videoid);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-black  w-full h-auto px-7 md:px-20 lg:px-44 text-gray-300 min-h-[100vh]'>
      <h2 className="font-bold text-center text-2xl pt-10">Coarse Layout</h2>
      {/* <LoadingDialog loading={loading}/> */}

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      {/* Course Detail */}
      <CourseDetails course={course} refreshData={() => GetCourse()} />
      {/* Lesson List */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button className="my-2" onClick={GenerateCourseChaptersContent}>
        Generate Course Content
      </Button>
    </div>
  );
};

export default CoarseLayout;
