import { FeatureFlag } from "@/app/dashboard/flags/flag";
import { current_api } from "../api/helper";
import axios, { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const feature_flag_api = `${current_api}/feature-flags`;

export async function getFeatureFlags(props?: listFeatureFlagsRequestParams): Promise<FeatureFlag[]> {
  let url = `${feature_flag_api}`;

  if (props?.query) {
    url += props.query;
  }

  const response = await fetch(url, { headers: props?.headers, cache: "no-cache" });

  const flags = response.json();

  return flags;
}

export async function getFeatureFlag(props: getFeatureFlagRequestParams): Promise<FeatureFlag> {
  return await (await fetch(`${feature_flag_api}/${props.id}`, { headers: props.headers })).json();
}

export async function deleteFeatureFlag(props: getFeatureFlagRequestParams): Promise<FeatureFlag> {
  return await (await fetch(`${feature_flag_api}/${props.id}`, { method: "DELETE", headers: props.headers })).json();
}

export async function updateFeatureFlag(props: updateFeatureFlagRequestParams): Promise<ProxyRequestResponse> {
  const body_to_update = props;

  const response = await fetch(`${feature_flag_api}/${props.id}`, {
    method: "PATCH",
    headers: props.headers,

    body: JSON.stringify({ ...body_to_update }),
  });

  const resp = await generate_proxy_response(response);

  return resp;
}

function getCookiesInstance() {
  return cookies();
}

function getToken() {
  return getCookiesInstance().get("token")?.value;
}

export async function postFeatureFlag({ body }: createFeatureFlagRequestParams): Promise<ProxyRequestResponse> {
  const token = getToken();

  const post_body = { ...body };

  const response = await fetch(`${feature_flag_api}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...post_body }),
  });

  const resp = await generate_proxy_response(response);

  return resp;

  // if (response.status !== 201) {
  //   return { status:r, json: resp };
  // } else {
  //   return {
  //     status: true,
  //     json: resp,
  //   };
  // }
}

export type ProxyRequestResponse = {
  status: number;
  json: any;
};

async function generate_proxy_response(res: Response) {
  let { status, json } = res;
  let json_parse_error = false;

  try {
    json = await res.json();
  } catch (error) {
    console.log("Houve um erro ao lidar com o json da api externa");

    json_parse_error;
  }

  return { status, json };
}
export type listFeatureFlagsRequestParams = {
  query?: string;
  params?: {
    per_page?: number;
    index?: number;
  };

  headers?: {
    Authorization: string;
  };
};

export type getFeatureFlagRequestParams = {
  id: string;
  headers?: {
    Authorization: string;
  };
};
export type createFeatureFlagRequestParams = {
  body: Partial<FeatureFlag>;
  //headers?: Partial<AxiosHeaders>;
};
export type updateFeatureFlagRequestParams = {
  id: string;
  body: Partial<FeatureFlag>;
  headers?: Partial<AxiosHeaders>;
};
