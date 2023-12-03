import { getFeatureFlags, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";

import { NextResponse } from "next/server";
import { FaCloudSunRain } from "react-icons/fa";

export const GET = async (req: Request, res: Response) => {
  //   console.log(req.url);

  //   const url = req.url;
  //   const queryParameters = req.url.match(/\?(.*)/);

  //   console.log({ url });

  //   console.log({ queryParameters });

  //   const url_parse = new URL(url);

  //   const params = url_parse.searchParams;

  // console.log(params.)

  // Extract the query parameters from the URL
  const queryParameters = new URLSearchParams(req.url.split("?")[1]);

  // Convert the query parameters to an object of type QueryParameters
  const queryParamsObject: QueryParameters = {};

  for (const [key, value] of queryParameters.entries()) {
    queryParamsObject[key] = value;
  }

  console.log({ queryParamsObject });

  const queryString = Object.entries(queryParamsObject)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  console.log({ queryString });

  const fullQueryString = `?${queryString}`;

  console.log({ fullQueryString });

  const flags = await getFeatureFlags({ headers: { Authorization: `Bearer ` }, query: fullQueryString });

  console.log("Retorno da get all flgags no server");
  console.log({ flags });

  return NextResponse.json(flags);
};

interface QueryParameters {
  [key: string]: string;
}
