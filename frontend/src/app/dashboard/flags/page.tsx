"use client";
import FeatureFlagToggle from "@/app/components/feature-flag/toggle";

import { EXPRESS_API_URI } from "../../services/api/helper";
import { FeatureFlag } from "./flag";
import { getFeatureFlags } from "@/app/services/feature-flags/FetureFlagApi";
import { flag_mocks } from "../../mocks/flags-mocks";
import { useEffect, useState } from "react";

export default function FeatureFlagsPage() {
  //const data = await fetch(`${EXPRESS_API_URI}/feature-flags`);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);

  useEffect(() => {
    fetch("/api/flags").then((res) => {
      console.log(res);

      //console.log(res.json());

      const json = res.json().then((res) => {
        setFlags(res);
      });

      console.log({ json });
      // setFlags(res.) as any);
    });
    // getFeatureFlags().then((res) => {
    //   setFlags(res);
    // });
  }, []);

  return (
    <div className=" container  h-full p-4  mb-2  w-full ">
      <ul className="w-full h-full flex  items-center flex-col  overflow-y-hidden">
        {flags.map((flag) => {
          return <FeatureFlagToggle key={flag.id} {...flag} />;
        })}
      </ul>
    </div>
  );
}

// import FeatureFlagToggle from "@/app/components/feature-flag/toggle";

// import { EXPRESS_API_URI } from "../../services/api/helper";
// import { FeatureFlag } from "./flag";
// import { getFeatureFlags } from "@/app/services/feature-flags/FetureFlagApi";
// import { flag_mocks } from "../../mocks/flags-mocks";

// export default async function FeatureFlagsPage() {
//   //const data = await fetch(`${EXPRESS_API_URI}/feature-flags`);

//   // const data = await fetch(`api/flags`);

//   const flags: FeatureFlag[] = await getFeatureFlags();

//   //const [flags, setFlags] = useState(flags);

//   return (
//     <div className=" container  h-full p-4  mb-2  w-full ">
//       <ul className="w-full h-full flex  items-center flex-col  ">
//         {flags.map((flag) => {
//           return <FeatureFlagToggle key={flag.id} {...flag} />;
//         })}
//       </ul>
//     </div>
//   );
// }
