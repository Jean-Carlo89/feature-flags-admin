import { FeatureFlag } from "@/app/dashboard/flags/flag";
/* eslint-disable react-hooks/rules-of-hooks */

import useApi from "@/app/hooks/useApi";
import { listFeatureFlagsRequestParams } from "./FetureFlagApi";

const fetchFeatureFlags = async (props: listFeatureFlagsRequestParams): Promise<FeatureFlag[]> => {
  let url = `cursos?populate=deep`;

  const { data } = await useApi().featureFlagsApi.getFeatureFlags(props);

  return data;
};

export default fetchFeatureFlags;
