"use client";

type FeatureFlagProps = {
  name: string;
  is_active: boolean;
};

import { useState } from "react";

const FeatureFlagToggle = ({ is_active, name }: FeatureFlagProps) => {
  const [isActive, setIsActive] = useState(is_active);

  const toggleStatus = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="h-[100px] bg-white flex justify-between items-center hover:bg-gray-300 w-[90%] xl:w-[70%] border p-4 rounded-lg mb-2">
      <p className="text-black">{name}</p>
      <div className="relative">
        <div className={`absolute top-0 bottom-0 w-10 h-10 rounded-full transition-all duration-1000 ease-in-out ${isActive ? "bg-green-500 right-0" : "bg-red-500 left-0"}`}></div>
        <button onClick={toggleStatus} className="w-20 h-10 bg-gray-200 rounded-full"></button>
      </div>
    </div>
  );
};

export default FeatureFlagToggle;
