"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import Category from "./_components/Category";
import TopicDesc from "./_components/TopicDesc";
import Options from "./_components/Options";
import { UserInputContext } from "../_context/UserInputContext";
import { GenearteCourseLayout_AI } from "@/config/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import uuid4 from "uuid4";
import {useUser} from "@clerk/nextjs"
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const StepperOption = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiMiniSquares2X2 />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const {user} = useUser()

  const router = useRouter()

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  useEffect(() => {
    // console.log(userCourseInput);
  }, [userCourseInput]);

  //   check for next btn to ne disabled
  const checkStatus = () => {
    if (userCourseInput?.length === 0) return true;
    else if (
      activeIndex === 0 &&
      (userCourseInput?.category?.length === 0 ||
        userCourseInput?.category === undefined)
    )
      return true;
    else if (
      activeIndex === 1 &&
      (userCourseInput?.topic?.length === 0 ||
        userCourseInput?.topic === undefined)
    )
      return true;
    else if (
      activeIndex === 2 &&
      (userCourseInput?.difficultLevel === undefined ||
        userCourseInput?.duration === undefined ||
        userCourseInput?.add === undefined ||
        userCourseInput?.noOfChapter === undefined)
    )
      return true;
    return false;
  };

  // const SaveCourseLayoutInDb =async (courseOutput) => {
  //   const id = uuid4()
  //   setLoading(true)
  //   const res = await db.insert(CourseList).values({
  //     courseId : id,
  //   name : userCourseInput?.topic,
  //   category : userCourseInput?.category,
  //   level : userCourseInput?.difficultLevel,
  //   courseOutput : courseOutput,
  //   createdBy : user?.primaryEmailAddress?.emailAddress,
  //   userName :  user?.fullName,   
  //   userProfileImage: user?.imageUrl
  // })

  // console.log("finished saving")
  // setLoading(false)
  // router.replace('/create-course'+id)
  // }

  const SaveCourseLayoutInDb = async (courseOutput) => {
    const id = uuid4();
    setLoading(true);

    try {
      await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        category: userCourseInput?.category,
        level: userCourseInput?.difficultLevel,
        courseOutput: courseOutput,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl,
      });
      console.log("finished saving");
      router.replace("/create-course/" + id); // Ensure this is within a try/catch block
    } catch (error) {
      console.error("Error saving course layout:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "Generate a course Tutorials on Following Details with fields as Course Name ,Description, Along with Chapter Name , about , duration : ";
    const USER_INPUT_PROMPT =
      "Category: " +
      userCourseInput?.category +
      ", Topic: " +
      userCourseInput?.topic +
      ", Level : " +
      userCourseInput?.difficultLevel +
      " , Duration : " +
      userCourseInput?.duration +
      " , NoOfChapter : " +
      userCourseInput?.noOfChapter;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT + " , in JSON format";
    console.log("final prompt", FINAL_PROMPT);

    const result = await GenearteCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(JSON.parse(result.response.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response.text()))
  };

  return (
    <div className="mx-32">
      <div>
        <div className="flex flex-col justify-center items-center mt-10">
          <h2 className="text-4xl font-medium">Create Course</h2>

          <div className="flex mt-10">
            {StepperOption.map((item, index) => (
              <div className="flex items-center">
                <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                  <div
                    className={`bg-gray-200 p-3 rounded-full text-white ${
                      activeIndex >= index && "bg-gray-950"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <h2 className="hidden md:block md:text-sm">{item.name}</h2>
                </div>
                {index != StepperOption.length - 1 && (
                  <div
                    className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                      activeIndex > index && "bg-gray-950"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {activeIndex == 0 && <Category />}
        {activeIndex == 1 && <TopicDesc />}
        {activeIndex == 2 && <Options />}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button disabled={checkStatus()} onClick={GenerateCourseLayout}>
              Generate LayOut
            </Button>
          )}
        </div>
      </div>
      {
        loading && <LoadingDialog loading={loading} />
      }
    </div>
  );
};

export default CreateCourse;
