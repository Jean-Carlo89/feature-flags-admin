"use client";
import Link from "next/link";
import { useState } from "react";
import { updateFeatureFlag } from "../../services/feature-flags/FetureFlagApi";

type FeatureFlagProps = {
  id: string;
  name: string;
  is_active: boolean;
};

const FeatureFlagToggle = (props: FeatureFlagProps) => {
  const [isActive, setIsActive] = useState(props.is_active);

  const toggleStatus = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("here");
    try {
      console.log("here");
      await updateFeatureFlag({
        id: props.id,
        body: {
          is_active: !isActive,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      //alert("Erro Atualizando o estado da flag");
      return;
    }
    setIsActive(!isActive);
  };

  return (
    <Link href={`/dashboard/flags/${props.id}?name=${props.name}`} className="h-[100px] bg-white flex justify-between items-center hover:bg-gray-300 w-[90%] xl:w-[70%] p-4 rounded-lg mb-2 relative">
      <p className="text-black">{props.name}</p>
      {/* <Link  className="z-1">
        <p className="text-black">{name}</p>
      </Link> */}

      <div onClick={toggleStatus} className="w-20 h-10 bg-gray-200 rounded-full flex items-center cursor-pointer relative">
        <div className={`absolute top-0 bottom-0 w-10 h-10 rounded-full transition-all duration-1000 ease-in-out ${isActive ? "bg-green-500 right-0" : "bg-red-500 left-0"}`}></div>
      </div>
    </Link>
  );
};

export default FeatureFlagToggle;

// "use client";

// type FeatureFlagProps = {
//   id: string;
//   name: string;
//   is_active: boolean;
// };

// import Link from "next/link";
// import { useState } from "react";

// const FeatureFlagToggle = ({ is_active, name, id }: FeatureFlagProps) => {
//   const [isActive, setIsActive] = useState(is_active);

//   const toggleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsActive(!isActive);
//   };

//   return (
//     <Link href={`/dashboard/flags/${id}`} className="h-[100px] bg-white flex justify-between items-center hover:bg-gray-300 w-[90%] xl:w-[70%]  p-4 rounded-lg mb-2">
//       <p className="text-black">{name}</p>
//       <div className="relative z-2">
//         <div className={`absolute z-2 top-0 bottom-0 w-10 h-10 rounded-full transition-all duration-1000 ease-in-out ${isActive ? "bg-green-500 right-0" : "bg-red-500 left-0"}`}></div>
//         <button onClick={(e) => toggleStatus(e)} className="w-20 h-10 z-30 bg-gray-200 rounded-full"></button>
//       </div>
//     </Link>
//   );
// };

// export default FeatureFlagToggle;
