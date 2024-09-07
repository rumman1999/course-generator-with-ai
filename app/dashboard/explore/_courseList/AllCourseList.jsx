"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import dynamic from "next/dynamic";
import { config } from "react-spring";
import CoursesCard from "../../_components/CourseCard";

// Dynamically import the Carousel component with no SSR
const Carousel = dynamic(() => import("react-spring-3d-carousel"), { ssr: false });

const getTouches = (evt) => {
  return evt.touches || evt.originalEvent.touches; // browser API
};

const AllCourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [gotoSlide, setGotoSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(2); // Add default value if needed
  const [xDown, setXDown] = useState(null);
  const [yDown, setYDown] = useState(null);
  const [enableSwipe, setEnableSwipe] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    getCourseList();
  }, []);

  const getCourseList = async () => {
    const result = await db
      .select()
      .from(CourseList)
      // .where(
      //   eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      // );
    setCourseList(result);
  };

  const handleTouchStart = (evt) => {
    if (!enableSwipe) {
      return;
    }

    const firstTouch = getTouches(evt)[0];
    setXDown(firstTouch.clientX);
    setYDown(firstTouch.clientY);
  };

  const handleTouchMove = (evt) => {
    if (!enableSwipe || xDown === null || yDown === null) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        setGotoSlide((prevSlide) => (prevSlide + 1) % courseList.length);
      } else {
        /* right swipe */
        setGotoSlide((prevSlide) => (prevSlide - 1 + courseList.length) % courseList.length);
      }
      setXDown(null);
      setYDown(null);
    }
  };

  useEffect(() => {
    // Start auto-sliding
    const id = setInterval(() => {
      setGotoSlide((prevSlide) => (prevSlide + 1) % courseList.length);
    }, 3000); // Change slide every 3 seconds

    setIntervalId(id);

    // Clean up on component unmount
    return () => clearInterval(id);
  }, [courseList]);

  return (
    <div className="m-10 text-gray-300">
      <h2 className="font-medium text-xl">All AI Courses</h2>
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
          animationConfig={config.slow}
        />
        }
      </div>
    </div>
  );
};

export default AllCourseList;
