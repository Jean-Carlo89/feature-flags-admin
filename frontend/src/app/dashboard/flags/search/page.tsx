import { NEXT_FEATURE_FLAG_URL } from "@/app/api/flags/helper";
import FeatureFlagToggle from "@/app/components/feature-flag/toggle";
import SearchBar from "@/app/components/search/SearchBar";
import Search from "@/app/components/search/SearchBar";
import { flag_mocks } from "@/app/mocks/flags-mocks";
import { current_api } from "@/app/services/api/helper";
import React, { useState } from "react";
import { FeatureFlag } from "../flag";
import { cookies } from "next/headers";

export default async function SearchFlagPage({ searchParams }) {
  const query = searchParams?.q | "";

  let flags: FeatureFlag[] = [];
  // const cookieStore = cookies();
  // const theme = cookieStore.get("token");

  if (searchParams?.q) {
    const response = await fetch(`${current_api}/feature-flags/state?q=${searchParams.q}`, {});

    flags = await response.json();
  }

  const loading = false;
  return (
    <>
      <div className=" container  h-full p-4  mb-2  w-full  ">
        <SearchBar />
        <ul className="w-full h-full flex  flex-col  overflow overflow-y-scroll   justify-items-center items-center mt-[10px]">
          {flags.map((flag, index) => {
            if (flags.length === index + 1) {
              return (
                <div className="w-full   mx-auto flex justify-items-center items-center " key={flag.id}>
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
    </>
  );
}
