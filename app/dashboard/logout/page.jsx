import { Button } from "@/components/ui/button";
import React from "react";
import { HiMiniCursorArrowRays } from "react-icons/hi2";
import { SignOutButton } from '@clerk/nextjs'


const Logout = () => {
    
  return (
    <div className="p-10 text-gray-400 flex flex-col justify-between items-center h-[40vh]">
      <div>
        <div className="text-2xl font-semibold">Sad To See You Go!!</div>
        <div className="text-lg">Hope You have enjoyed the journey</div>
        <SignOutButton>
        <Button  className="mt-4 px-6 py-2 bg-gray-950 text-red-700 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out border-red-950 border-2">
          Sign Out
        </Button>
        </SignOutButton>
      </div>
      <div className="border-gray-300 border-2 p-10 rounded-sm w-fit mt-14">
        Connect with me
        <div className="flex gap-10">
          <a
            href="https://github.com/rumman1999"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex gap-5 items-center m-2 cursor-pointer p-4 bg-gray-900 rounded-lg">
              GITHUB <HiMiniCursorArrowRays />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/rummanhase/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex gap-5 items-center m-2 cursor-pointer p-4 bg-gray-900 rounded-lg">
              LinkedIn <HiMiniCursorArrowRays />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Logout;
