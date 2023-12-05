"use client";
import FeatureFlagToggle from "@/app/components/feature-flag/toggle";

import { EXPRESS_API_URI } from "../../services/api/helper";
import { FeatureFlag } from "./flag";
import { getFeatureFlags } from "@/app/services/feature-flags/FetureFlagApi";
import { flag_mocks } from "../../mocks/flags-mocks";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { useScroll } from "@/app/hooks/useScroll";

export default function FeatureFlagsPage() {
  //const data = await fetch(`${EXPRESS_API_URI}/feature-flags`);
  // const [flags, setFlags] = useState<FeatureFlag[]>([]);

  let [index, setIndex] = useState(0);
  const { loading, new_flags, hasMore } = useScroll(index);

  const oracle = useRef();
  const last_flag = useCallback(
    (node: any) => {
      if (loading) return;
      if (oracle.current) oracle.current.disconnect();
      oracle.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIndex((prevIndex: number) => {
            return prevIndex + 20;
          });

          console.log("I can see you");
        }
      });
      if (node) oracle.current.observe(node);
    },
    [loading, hasMore]
  );

 

  return (
    <>
      {new_flags.length === 0 ? (
        <div>{loading ? <div>Loading....</div> : "Sem Registros encontrados"}</div>
      ) : (
        <div className=" container  h-full p-4  mb-2  w-full  ">
          <ul className="w-full h-full flex  flex-col  overflow overflow-y-scroll   justify-items-center items-center">
            {new_flags.map((flag, index) => {
              if (new_flags.length === index + 1) {
                return (
                  <div className="w-full   mx-auto flex justify-items-center items-center " key={flag.id} ref={last_flag}>
                    <FeatureFlagToggle key={flag.id} {...flag} />
                  </div>
                );
              } else {
                return (
                  <div className="w-full   mx-auto flex justify-items-center items-center " key={flag.id}>
                    <FeatureFlagToggle key={flag.id} {...flag} />
                  </div>
                );
              }
            })}
          </ul>
          {loading ? <div>Loading....</div> : null}
        </div>
      )}
    </>
  );
}
