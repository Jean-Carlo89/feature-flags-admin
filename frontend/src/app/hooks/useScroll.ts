import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NEXT_FEATURE_FLAG_URL } from "../api/flags/helper";
import { FeatureFlag } from "../dashboard/flags/flag";

export const useScroll = (last_index: number, flags?: Dispatch<SetStateAction<FeatureFlag[]>>) => {
  const [loading, SetLoading] = useState(true);
  const [new_flags, setNewFlags] = useState<FeatureFlag[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    SetLoading(true);

    const query = `${NEXT_FEATURE_FLAG_URL}?index=${last_index}`;

    fetch(query, { headers: {} })
      .then((res) => {
        res.json().then((res) => {
          const length = res.length;

          setNewFlags((prevFlags) => {
            return [...prevFlags, ...res];
          });

          setHasMore(res.length > 0);
          SetLoading(false);

          // setNewFlags(res);
          SetLoading(false);
          return res;
        });
      })
      .catch((e) => {
        console.error(e);
        alert("The was an error ");

        SetLoading(false);
      });
  }, [last_index]);

  return { loading, new_flags, hasMore };
};
