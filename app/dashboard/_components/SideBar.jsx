"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  HiHome,
  HiMiniRocketLaunch,
  HiOutlineArrowUpTray,
  HiMiniArrowLeftEndOnRectangle,
} from "react-icons/hi2";
import { Progress } from "@/components/ui/progress";

const SideBar = () => {
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
      <div className="flex items-center justify-center">
        <Image src={"/logo1.png"} width={160} height={100} alt="Logo" />
      </div>
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

      {/* <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <h2 className="text-sm my-2">3 out of 5 courses created</h2>
        <h2 className="text-xs text-gray-400">
          Upgrade your plan for unlimited courses
        </h2>
      </div> */}
    </div>
  );
};

export default SideBar;
