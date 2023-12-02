import FeatureFlagToggle from "@/app/components/feature-flag/toglle";
import { flag_mocks } from "@/app/mocks/flags-mocks";

export default function FeatureFlagsPage() {
  return (
    <div className=" container  h-full p-4  mb-2  w-full ">
      <ul className="w-full h-full flex  items-center flex-col  border-4 border-red-500">
        {flag_mocks.map((flag) => {
          return <FeatureFlagToggle key={flag.id} name={flag.name} is_active={flag.is_active} />;
        })}
      </ul>
    </div>
  );
}
