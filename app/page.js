"use client"
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect, useRef } from "react";

export default function Home() {

    const videoRef = useRef(null);

  useEffect(() => {
    // Set the video playback speed to slow motion
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the speed to half the normal rate (0.5)
    }
  }, []);

  return (
    <div className="h-100 overflow-hidden">
       <section className="relative bg-gray-50 h-[100vh] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/hero.mp4"
        type="video/mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-32 flex items-center justify-center">
        <div className="mx-auto max-w-xl text-center text-white">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Create Courses using AI
            <strong className="block font-extrabold text-gray-400">Easy And Quick</strong>
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            Create custom courses effortlessly with AI-powered tools tailored to your needs.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {/* Buttons or additional content can be added here */}
          </div>
        </div>
      </div>
    </section>
    <div className="fixed bottom-0 left-0 right-0 w-full  flex justify-between px-5 shadow-md h-[100px] items-center z-1">
      <Image src={'/logo1.png'} width={150} height={100} alt="Logo" />
      <div className="h-1/2">
        <a
          className="block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-gray-700 focus:outline-none focus:ring active:bg-gray-500 sm:w-auto "
          href="/dashboard"
        >
          Click here to Get Started
        </a>
      </div>
    </div>
    </div>
  );
}
