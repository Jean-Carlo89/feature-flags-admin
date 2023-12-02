import FeatureFlagsApi from "../services/feature-flags/FetureFlagApi";

export default function useApi() {
  return {
    featureFlagsApi: new FeatureFlagsApi(),
  };
}
