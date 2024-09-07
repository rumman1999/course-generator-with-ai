'use client'
import { db } from '@/config/db';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ChapterListCard from '../_components/ChapterListCard';
import { Chapters, CourseList } from '@/config/schema';
import ChapterContent from '../_components/ChapterContent';

const CoursePage = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState({});

  useEffect(() => {
    if (params) fetchCourseData();
  }, [params]);

  const handleChapterClick = (chapter, index) => {
    setSelectedChapter(chapter);
    fetchChapterContent(index);
  };

  const fetchChapterContent = async (chapterIndex) => {
    const result = await db.select().from(Chapters).where(
      and(
        eq(params.courseId, Chapters.courseId),
        eq(Chapters.chapterId, chapterIndex)
      )
    );
    setChapterContent(result[0]);
  };

  const fetchCourseData = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, params.courseId));

    const courseData = result[0];
    setCourse(courseData);
    const initialChapter = courseData.courseOutput?.course?.chapters?.[0];
    console.log(initialChapter)
    setSelectedChapter(initialChapter);
    fetchChapterContent(0);
  };

  return (
    <div className="flex bg-gradient-to-b from-gray-900 via-gray-800 to-black  w-full h-[100vh] overflow-hidden  text-gray-300 shadow-sm">
      <div className="md:w-80 hidden md:block h-screen max-h[100vh] overflow-y-auto scrollbar-custom">
        <h2 className="font-medium text-lg p-3">{course?.name}</h2>
        <div>
          {course?.courseOutput?.course?.chapters?.map((chapter, index) => (
            <ChapterListCard
              chapter={chapter}
              key={index}
              index={index}
              handleClick={handleChapterClick}
            />
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1  p-4">
        <ChapterContent content={chapterContent} course={course} selectedChapter={selectedChapter} />
      </div>
    </div>
  );
};

export default CoursePage;
