import { NEXT_FEATURE_FLAG_URL } from "@/app/api/flags/helper";
import FeatureFlagToggle from "@/app/components/feature-flag/toggle";
import SearchBar from "@/app/components/search/SearchBar";
import Search from "@/app/components/search/SearchBar";
import { flag_mocks } from "@/app/mocks/flags-mocks";
import { current_api } from "@/app/services/api/helper";
import React, { useState } from "react";
import { FeatureFlag } from "../flag";
import { cookies } from "next/headers";
import { getAuthHeader, getToken } from "@/app/services/feature-flags/FetureFlagApi";
import { redirect } from "next/navigation";

export default async function SearchFlagPage({ searchParams }) {
  const query = searchParams?.q | "";

  let flags: FeatureFlag[] = [];
  // const cookieStore = cookies();
  // const theme = cookieStore.get("token")
  const token = getToken();
  if (searchParams?.q) {
    const response = await fetch(`${current_api}/feature-flags/state-search?q=${searchParams.q}`, { headers: getAuthHeader() });

    if (response.status === 401) {
      flags = [];

      redirect("/login");
      return;
    }
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
                <div className="w-full   mx-auto flex justify-items-center items-center " key={index}>
                  <FeatureFlagToggle key={index} {...flag} />
                </div>
              );
            } else {
              return (
                <div className="w-full   mx-auto flex justify-items-center items-center " key={index}>
                  <FeatureFlagToggle key={index} {...flag} />
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
