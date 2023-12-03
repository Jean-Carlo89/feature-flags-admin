"use client";
import FeatureFlagToggle from "@/app/components/feature-flag/toggle";

import { EXPRESS_API_URI } from "../../services/api/helper";
import { FeatureFlag } from "./flag";
import { getFeatureFlags } from "@/app/services/feature-flags/FetureFlagApi";
import { flag_mocks } from "../../mocks/flags-mocks";
import { useEffect, useState } from "react";
import { useScroll } from "@/app/hooks/useScroll";

export default function FeatureFlagsPage() {
  //const data = await fetch(`${EXPRESS_API_URI}/feature-flags`);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);

  const [index, SetIndex] = useState(0);
  const { loading, new_flags } = useScroll(0);

  useEffect(() => {
    fetch("/api/flags").then((res) => {
      const json = res.json().then((res) => {
        setFlags(res);
      });
    });
  }, []);

  return (
    <>
      {flags.length === 0 ? null : (
        <div className=" container  h-full p-4  mb-2  w-full  ">
          <ul className="w-full h-full flex  items-center flex-col border-4 border-red-500 overflow overflow-y-scroll">
            {flags.map((flag) => {
              return <FeatureFlagToggle key={flag.id} {...flag} />;
            })}
          </ul>
          {loading ? <div>Loading....</div> : null}
        </div>
      )}
    </>
  );
}
