import { getFeatureFlag, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, res: Response) => {
  console.log("entrou no patch");
  const body = { ...req.body };

  const id = req.url.split("flags/")[1];
  const proxy_body = await req.json();
  console.log({ proxy_body });

  await updateFeatureFlag({ ...proxy_body, id });

  return;
};

export const GET = async (req: Request, res: Response) => {
  console.log("in request by id");

  const id = req.url.split("flags/")[1];

  console.log("reqeusting");
  const flag = await getFeatureFlag({ id });
  console.log("reqeusting2222222");

  return NextResponse.json(flag);
};
