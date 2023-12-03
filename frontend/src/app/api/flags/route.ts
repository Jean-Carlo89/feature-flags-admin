import { getFeatureFlags, postFeatureFlag, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";

import { NextResponse } from "next/server";
import { FaCloudSunRain } from "react-icons/fa";

export const GET = async (req: Request, res: Response) => {
  const queryParameters = new URLSearchParams(req.url.split("?")[1]);

  // Convert the query parameters to an object of type QueryParameters
  const queryParamsObject: QueryParameters = {};

  for (const [key, value] of queryParameters.entries()) {
    queryParamsObject[key] = value;
  }

  const queryString = Object.entries(queryParamsObject)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const fullQueryString = `?${queryString}`;

  const flags = await getFeatureFlags({ headers: { Authorization: `Bearer ` }, query: fullQueryString });

  return NextResponse.json(flags);
};

export const POST = async (req: Request, res: Response) => {
  const body = { ...req.body };

  req.headers;

  const json_body = await req.json();

  await postFeatureFlag({ body: { ...json_body } });
};

interface QueryParameters {
  [key: string]: string;
}
