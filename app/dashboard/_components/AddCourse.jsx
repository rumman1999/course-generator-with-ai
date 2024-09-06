"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const AddCourse = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center text-gray-300">
      <div>
        <h2 className="text-xl">
          Hello ,<span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-sm text-gray-500">Create new course here with AI</p>
      </div>
      <Link href={"/create-course"}>
        <Button className="py-2 px-4 rounded hover:bg-gray-800 transition-colors  hover:scale-105">+ Create AI Course</Button>
      </Link>
    </div>
  );
};

export default AddCourse;
