import api from "../api/axios";

export default class FeatureFlagsApi {
  getFeatureFlags(props: listFeatureFlagsRequestParams) {
    return api.get("/feature-flags", { headers: props.headers, params: props.params });
  }

  getFeatureFlag() {
    return api.get("/feature-flags");
  }
}

export type listFeatureFlagsRequestParams = {
  params: {
    per_page?: number;
    index?: number;
  };

  headers: {
    Authorization: string;
  };
};
