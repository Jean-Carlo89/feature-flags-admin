import { deleteFeatureFlag, getFeatureFlag, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { NextResponse } from "next/server";
import { generate_next_api_standard_response } from "../route";
import { redirect } from "next/dist/server/api-utils";

export const PATCH = async (req: Request, res: Response) => {
  const body = { ...req.body };

  const id = req.url.split("flags/")[1];
  const proxy_body = await req.json();

  const resp = await updateFeatureFlag({ ...proxy_body, id });

  return generate_next_api_standard_response(resp);
};

export const GET = async (req: Request, res: Response) => {
  const id = req.url.split("flags/")[1];

  const flag = await getFeatureFlag({ id });

  // return NextResponse.json(flag);

  return generate_next_api_standard_response(flag);
};

export const DELETE = async (req: Request, res: Response) => {
  const id = req.url.split("flags/")[1];

  const flag = await deleteFeatureFlag({ id });

  return generate_next_api_standard_response(flag);
};
