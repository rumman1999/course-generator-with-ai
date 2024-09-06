import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import CoursesCard from "./CourseCard";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

const CoursessList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [gotoSlide, setGotoSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(0); // Add default value if needed
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getCourseList();
    }
  }, [user]);

  const getCourseList = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setCourseList(result);
  };



  const handleTouchStart = (evt) => {
    if (!this.state.enableSwipe) {
      return;
    }

    const firstTouch = getTouches(evt)[0];
    this.setState({
      ...this.state,
      xDown: firstTouch.clientX,
      yDown: firstTouch.clientY
    });
  };

  const handleTouchMove = (evt) => {
    if (!this.state.enableSwipe || (!this.state.xDown && !this.state.yDown)) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.state.xDown - xUp;
    let yDiff = this.state.yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        this.setState({
          goToSlide: this.state.goToSlide + 1,
          xDown: null,
          yDown: null
        });
      } else {
        /* right swipe */
        this.setState({
          goToSlide: this.state.goToSlide - 1,
          xDown: null,
          yDown: null
        });
      }
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
      <h2 className="font-medium text-xl">My AI Courses</h2>
      <div
        style={{ width: "80%", height: "400px", margin: "0 auto" }}
      >
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
      </div>
    </div>
  );
};

export default CoursessList;
