import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import CoursesCard from "./CourseCard";
import dynamic from "next/dynamic";

// Dynamically import the Carousel component with no SSR
const Carousel = dynamic(() => import("react-spring-3d-carousel"), { ssr: false });

const CoursessList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [gotoSlide, setGotoSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [xDown, setXDown] = useState(null);
  const [yDown, setYDown] = useState(null);
  const [enableSwipe, setEnableSwipe] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    user?.primaryEmailAddress && getCourseList();
  }, [user]);

  const getCourseList = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setCourseList(result);
  };

  const handleTouchStart = (evt) => {
    if (!enableSwipe) return;
    const firstTouch = evt.touches[0];
    setXDown(firstTouch.clientX);
    setYDown(firstTouch.clientY);
  };

  const handleTouchMove = (evt) => {
    if (!enableSwipe || xDown === null || yDown === null) return;

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        setGotoSlide((prevSlide) => (prevSlide + 1) % courseList.length);
      } else {
        setGotoSlide((prevSlide) => (prevSlide - 1 + courseList.length) % courseList.length);
      }
      setXDown(null);
      setYDown(null);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      setGotoSlide((prevSlide) => (prevSlide + 1) % courseList.length);
    }, 3000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, [courseList]);

  return (
    <div className="m-10 text-gray-300">
      <h2 className="font-medium text-xl">My AI Courses</h2>
      <div
        style={{ width: "80%", height: "400px", margin: "0 auto" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {
          courseList.length > 0 && 
          <Carousel
            slides={courseList.map((course, index) => ({
              key: index,
              content: <CoursesCard course={course} key={index} />
            }))}
            goToSlide={gotoSlide}
            offsetRadius={offsetRadius}
            showNavigation={true}
            animationConfig={{ tension: 200, friction: 20 }} // Example configuration
          />
        }
      </div>
    </div>
  );
};

export default CoursessList;
