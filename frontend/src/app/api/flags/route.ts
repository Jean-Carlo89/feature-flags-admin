import { getFeatureFlags, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { NextResponse } from "next/server";
import { FaCloudSunRain } from "react-icons/fa";

export const GET = async (req: Request, res: Response) => {
  const flags = await getFeatureFlags();

  return NextResponse.json(flags);
};
