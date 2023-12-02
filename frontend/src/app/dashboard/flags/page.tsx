import FeatureFlagToggle from "@/app/components/feature-flag/toglle";
import useApi from "@/app/hooks/useApi";
import { flag_mocks } from "@/app/mocks/flags-mocks";
import fetchFeatureFlags from "@/app/services/feature-flags/fetchFeatureFlags";

export default async function FeatureFlagsPage() {
  const flags = await fetchFeatureFlags(1 as any);
  return (
    <div className=" container  h-full p-4  mb-2  w-full ">
      <ul className="w-full h-full flex  items-center flex-col  ">
        {flag_mocks.map((flag) => {
          return <FeatureFlagToggle key={flag.id} {...flag} />;
        })}
      </ul>
    </div>
  );
}
