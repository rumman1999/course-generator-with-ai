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
      icon: <HiHome />,
      path: "/dashboard",
    },
    {
      id: 1,
      name: "Explore",
      icon: <HiMiniRocketLaunch />,
      path: "/dashboard/explore",
    },
    {
      id: 1,
      name: "Upgrade",
      icon: <HiOutlineArrowUpTray />,
      path: "/dashboard/upgrade",
    },
    {
      id: 1,
      name: "LogOut",
      icon: <HiMiniArrowLeftEndOnRectangle />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={"/vercel.svg"} width={160} height={100} />
      <hr className="my-5" />
      <ul>
        {Menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              key={index}
              className={`flex items-center gap-2 text-gray-600 mb-2 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg p-3 ${
                item.path === path && "bg-gray-100 text-black "
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <h2 className="text-sm my-2">3 out of 5 courses created</h2>
        <h2 className="text-xs text-gray-500">Upgrader your plan for unlimited coarse</h2>
      </div>
    </div>
  );
};

export default SideBar;
