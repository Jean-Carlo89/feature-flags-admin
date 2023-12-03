import { deleteFeatureFlag, getFeatureFlag, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, res: Response) => {
  const body = { ...req.body };

  const id = req.url.split("flags/")[1];
  const proxy_body = await req.json();

  await updateFeatureFlag({ ...proxy_body, id });

  return;
};

export const GET = async (req: Request, res: Response) => {
  const id = req.url.split("flags/")[1];

  const flag = await getFeatureFlag({ id });

  return NextResponse.json(flag);
};

export const DELETE = async (req: Request, res: Response) => {
  const id = req.url.split("flags/")[1];

  const flag = await deleteFeatureFlag({ id });

  return;
};
