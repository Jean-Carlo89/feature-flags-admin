import { ProxyRequestResponse, getFeatureFlags, postFeatureFlag, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";

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

  const response = await postFeatureFlag({ body: { ...json_body } });

  return generate_next_api_standard_response(response);
};

export function generate_next_api_standard_response(res: ProxyRequestResponse) {
  const { status, json } = res;

  return NextResponse.json({ status, json: json ? json : { message: null } });
}

interface QueryParameters {
  [key: string]: string;
}
