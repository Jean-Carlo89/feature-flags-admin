import { FeatureFlag } from "@/app/dashboard/flags/flag";
import { current_api } from "../api/helper";
import axios, { AxiosHeaders } from "axios";

const feature_flag_api = `${current_api}/feature-flags`;

export async function getFeatureFlags(props?: listFeatureFlagsRequestParams): Promise<FeatureFlag[]> {
  console.log(props?.query);
  console.log("ggggggggggggggggggggg");

  let url = `${feature_flag_api}`;

  if (props?.query) {
    url += props.query;
  }

  console.log({ url });
  const response = await fetch(url, { headers: props?.headers, cache: "no-cache" });

  const flags = response.json();

  return flags;
}

export async function getFeatureFlag(props: getFeatureFlagRequestParams): Promise<FeatureFlag> {
  return await (await fetch(`${feature_flag_api}/${props.id}`, { headers: props.headers })).json();
}

export async function updateFeatureFlag(props: updateFeatureFlagRequestParams): Promise<void> {
  console.log("herefff");

  const body_to_update = props;

  console.log({ body: body_to_update });

  await fetch(`${feature_flag_api}/${props.id}`, {
    method: "PATCH",
    headers: props.headers,

    body: JSON.stringify({ ...body_to_update }),
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

export type updateFeatureFlagRequestParams = {
  id: string;
  body: Partial<FeatureFlag>;
  headers?: Partial<AxiosHeaders>;
};
// export class FeatureFlagsApi {
//   getFeatureFlags(props: listFeatureFlagsRequestParams) {
//     return api.get("/feature-flags", { headers: props.headers, params: props.params });
//   }

//   getFeatureFlag() {
//     return api.get("/feature-flags");
//   }
// }

// export type listFeatureFlagsRequestParams = {
//   params: {
//     per_page?: number;
//     index?: number;
//   };

//   headers: {
//     Authorization: string;
//   };
// };
