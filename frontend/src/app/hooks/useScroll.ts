import { useEffect, useState } from "react";
import { NEXT_FEATURE_FLAG_URL } from "../api/flags/helper";
import { FeatureFlag } from "../dashboard/flags/flag";

export const useScroll = (last_index: number) => {
  const [loading, SetLoading] = useState(true);
  const [new_flags, setNewFlags] = useState<FeatureFlag[]>([]);

  useEffect(() => {
    SetLoading(true);

    const query = `${NEXT_FEATURE_FLAG_URL}?index=${last_index}`;

    console.log("START HPOOK");
    console.log({ query });

    fetch(query, { headers: {} })
      .then((res) => {
        res.json().then((res) => {
          console.log("REtorno do useScroll");
          console.log({ res });
          // setFlags((prevFlags) => {
          //   return [...prevFlags, res];
          // });

          setNewFlags(res);
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

  return { loading, new_flags };
};
