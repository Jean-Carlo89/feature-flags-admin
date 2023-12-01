import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { FaReact } from "react-icons/fa";
type BarProps = {
  children: React.ReactNode;
};

export default function bar({ children }: BarProps) {
  return (
    // <div className="flex flex-col border-4 border-green-100 h-full">
    <div className="w-20 h-[89vh]  bg-white border-r-[1px] flex flex-col justify-between border-4 border-green-100">
      <div className=" flex flex-col z-10 items-center    ">
        <Link href="/">
          <div className=" bg-green-400 mt-[5px] text-black p-3 rounded-lg inline-block">
            {/* <Image src="./grupo-boticario-logo-.svg" width={80} height={80} alt={""} /> */}

            <Image src="/logo.png" width={40} height={50} alt={""} />
            {/* <FaReact size={40} color="#00FFFF" /> */}
          </div>

          {/* <RxSketchLogo size={35} /> */}
        </Link>

        <span className="border-b-[1px] border-gray-200 w-full p-2"></span>

        <Link href="/new">
          <div className="text-black bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <RxDashboard size={25} />
          </div>
        </Link>
      </div>

      <div className=" ml-[5px]  rounded-full z-20 bg-slate-500 w-[50px] h-[50px] bg-rounded">
        <FaUserCircle size={50} />
      </div>
    </div>

    //
    // </div>
  );
}
