"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  HiHome,
  HiMiniRocketLaunch,
  HiMiniArrowLeftEndOnRectangle,
} from "react-icons/hi2";
import ChatBot from "./ChatBot";

const SideBar = () => {
  const [openChatBot , setOpenChatBot] = useState(false)
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiHome aria-hidden="true" />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiMiniRocketLaunch aria-hidden="true" />,
      path: "/dashboard/explore",
    },
    // {
    //   id: 3,
    //   name: "Upgrade",
    //   icon: <HiOutlineArrowUpTray aria-hidden="true" />,
    //   path: "/dashboard/upgrade",
    // },
    {
      id: 4,
      name: "LogOut",
      icon: <HiMiniArrowLeftEndOnRectangle aria-hidden="true" />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();

  return (
    <div
      className="fixed h-full md:w-64 p-5 shadow-md text-white overflow-auto "
      style={{ boxShadow: "4px 0 6px rgba(0, 0, 0, 0.1)" }}
    >
      {/* <div className="flex items-center">
        <Image src={"/logo1.png"} width={50} height={50} alt="Logo" className="rounded-full"/>
      </div> */}
      <hr className="my-5 border-gray-700" />
      <ul>
        {Menu.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 text-gray-300 mb-2 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-300 rounded-lg p-3 ${
                  item.path === path && "bg-gray-700 text-white"
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {
        openChatBot === false ? 
        <div className="absolute bottom-10 mx-auto border-gray-700 p-2 border-2 rounded-sm cursor-pointer hover:bg-black text-gray-500 hover:text-gray-600 hover:scale-110 transition-transform duration-500 ease-in-out transform" onClick={()=>setOpenChatBot(true)}>
          Open Generator Chat Bot
        </div> :
      <div  className="absolute bottom-2 left-0 m-1 w-[98%] border-gray-700 p-2 border-2 h-[380px] rounded-sm">
        <ChatBot setOpenChatBot={setOpenChatBot}/>
      </div>

      }
    </div>
  );
};

export default SideBar;
