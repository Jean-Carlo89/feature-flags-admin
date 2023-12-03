import FeatureFlagToggle from "@/app/components/feature-flag/toggle";

import { EXPRESS_API_URI } from "../../services/api/helper";
import { FeatureFlag } from "./flag";
import { getFeatureFlags } from "@/app/services/feature-flags/FetureFlagApi";

export default async function FeatureFlagsPage() {
  const data = await fetch(`${EXPRESS_API_URI}/feature-flags`);

  const flags: FeatureFlag[] = await getFeatureFlags();

  return (
    <div className=" container  h-full p-4  mb-2  w-full ">
      <ul className="w-full h-full flex  items-center flex-col  ">
        {flags.map((flag) => {
          return <FeatureFlagToggle key={flag.id} {...flag} />;
        })}
      </ul>
    </div>
  );
}
