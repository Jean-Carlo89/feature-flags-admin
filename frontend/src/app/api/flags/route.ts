import { getFeatureFlags, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { NextResponse } from "next/server";
import { FaCloudSunRain } from "react-icons/fa";

export const GET = async (req: Request, res: Response) => {
  console.log(req.url);

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("index");
  console.log(param);
  const flags = await getFeatureFlags();

  return NextResponse.json(flags);
};
