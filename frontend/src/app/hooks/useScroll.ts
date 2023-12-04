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
            // console.log({ prevFlags });

            // console.log({ res });

            // console.log({ result_state: [...prevFlags, ...res] });

            const prev = [...prevFlags];

            // const areIdentical = prev.every((element, index) => {
            //   console.log({ element });

            //   console.log({ resp: res[index] });
            //   element.id === res[index].id;
            // });

            // if (areIdentical) {
            //   console.log("here");
            //   // The arrays have the same elements in the same order.
            //   return [...prev];
            // }

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
