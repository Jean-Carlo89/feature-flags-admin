import { FeatureFlag } from "@/app/dashboard/flags/flag";
import { current_api } from "../api/helper";
import axios, { AxiosHeaders } from "axios";

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

export async function updateFeatureFlag(props: updateFeatureFlagRequestParams): Promise<void> {
  const body_to_update = props;

  await fetch(`${feature_flag_api}/${props.id}`, {
    method: "PATCH",
    headers: props.headers,

    body: JSON.stringify({ ...body_to_update }),
  });
}

export async function postFeatureFlag(props: createFeatureFlagRequestParams): Promise<void> {
  const post_body = props.body;

  await fetch(`${feature_flag_api}`, {
    method: "POST",
    headers: props.headers,

    body: JSON.stringify({ ...post_body }),
  });
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
  headers?: Partial<AxiosHeaders>;
};
export type updateFeatureFlagRequestParams = {
  id: string;
  body: Partial<FeatureFlag>;
  headers?: Partial<AxiosHeaders>;
};
