import { NEXT_FEATURE_FLAG_URL } from "@/app/api/flags/helper";
import FeatureFlagToggle from "@/app/components/feature-flag/toggle";
import SearchBar from "@/app/components/search/SearchBar";
import Search from "@/app/components/search/SearchBar";
import { flag_mocks } from "@/app/mocks/flags-mocks";
import React, { useState } from "react";

export default function SearchFlagPage({ searchParams }) {
  const query = searchParams?.q | "";

  console.log(searchParams.q);

  console.log(searchParams);

  console.log(query);

  console.log({ query2: searchParams.q });

  const loading = false;
  return (
    <>
      <div className=" container  h-full p-4  mb-2  w-full  ">
        <SearchBar />
        <ul className="w-full h-full flex  flex-col  overflow overflow-y-scroll   justify-items-center items-center">
          {flag_mocks.map((flag, index) => {
            if (flag_mocks.length === index + 1) {
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
