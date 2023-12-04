/* eslint-disable react/no-children-prop */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { FaReact } from "react-icons/fa";
import MenuLink from "../menu-link/menuLink";
import { IoAddCircleOutline } from "react-icons/io5";

import { FaSearch } from "react-icons/fa";
type BarProps = {
  children: React.ReactNode;
};

export default function bar({ children }: BarProps) {
  return (
    <div className="w-20 h-full container bg-slate-300 border-r-[1px] flex flex-col justify-between  ">
      <div className=" flex flex-col z-10 items-center    ">
        <Link href="/">
          <div className=" bg-orange-400 mt-[5px] text-black p-3 rounded-lg inline-block">
            <Image src="/logo.png" width={40} height={50} alt={"dashboard-logo"} />
          </div>
        </Link>

        <span className="border-b-[1px] border-gray-200 w-full p-2"></span>

        <MenuLink children={<RxDashboard size={25} />} href={"/dashboard/flags"} className={"text-black bg-gray-100 hover:bg-gray-300 cursor-pointer my-4 p-3 rounded-lg inline-block"} />

        <MenuLink children={<IoAddCircleOutline size={25} />} href={"/dashboard/flags/add"} className={"text-black bg-gray-100 hover:bg-gray-300 cursor-pointer my-4 p-3 rounded-lg inline-block"} />

        <MenuLink children={<FaSearch size={25} />} href={"/dashboard/flags/search"} className={"text-black bg-gray-100 hover:bg-gray-300 cursor-pointer my-4 p-3 rounded-lg inline-block"} />
      </div>

      <div className=" ml-[15px] mb-[5px] rounded-full z-20 bg-slate-500 w-[50px] h-[50px] bg-rounded">
        <FaUserCircle size={50} />
      </div>
    </div>
  );
}
