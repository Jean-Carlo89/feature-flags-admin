"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function LogoutComponent() {
  const router = useRouter();
  function logout() {
    //alert("clicked");
   
    localStorage.clear();

    router.push("/login");
  }
  return (
    <div onClick={logout} className=" ml-[15px] mb-[5px] rounded-full cursor-pointer  bg-slate-500 w-[50px] h-[50px] bg-rounded z-20">
      <FaUserCircle size={50} />
    </div>
  );
}
