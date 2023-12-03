import { useEffect, useState } from "react";
import { NEXT_FEATURE_FLAG_URL } from "../api/flags/helper";
import { FeatureFlag } from "../dashboard/flags/flag";

export const useScroll = (last_index: number) => {
  const [loading, SetLoading] = useState(true);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);

  useEffect(() => {
    SetLoading(true);

    console.log("hoooooooooooooooooks");
    fetch(`${NEXT_FEATURE_FLAG_URL}?index=${last_index}`, { headers: {} })
      .then((res) => {
        res.json().then((res) => {
          console.log({ res });
          setFlags((prevFlags) => {
            return [...prevFlags, res];
          });
          SetLoading(false);
          return res;
        });
      })
      .catch((e) => {
        console.error(e);
        alert("The was an error ");

        SetLoading(false);
      });
  }, []);

  return { loading, flags };
};
