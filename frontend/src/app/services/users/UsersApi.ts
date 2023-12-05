import { FeatureFlag } from "@/app/dashboard/flags/flag";
import { current_api } from "../api/helper";
import axios, { AxiosHeaders } from "axios";

const feature_flag_api = `${current_api}/users`;

export async function LoginRequest(props: LoginRequestParams): Promise<LoginRequestParamsResponse> {
  const post_body = props.body;

  const request = await fetch(`${feature_flag_api}/login`, {
    method: "POST",
    headers: {},
    body: JSON.stringify({ ...post_body }),
  });

  const response = await request.json();

  return response;
}

export type LoginRequestParams = {
  body: { email: string; password: string };
  headers?: Partial<AxiosHeaders>;
};

export type LoginRequestParamsResponse = {
  token: string;
  user: { id: String; name: String };
};
