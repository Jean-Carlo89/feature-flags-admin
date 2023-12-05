import LoginForm from "@/app/components/login-form/login";
import { getFeatureFlags, postFeatureFlag, updateFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { LoginRequest } from "@/app/services/users/UsersApi";

import { NextResponse } from "next/server";
import { FaCloudSunRain } from "react-icons/fa";

export const POST = async (req: Request, res: Response) => {
  const json_body = await req.json();

  const response = await LoginRequest({ body: json_body });

  return NextResponse.json(response);
};
