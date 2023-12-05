import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NEXT_FEATURE_FLAG_URL } from "../api/flags/helper";
import { FeatureFlag } from "../dashboard/flags/flag";
import { useRouter } from "next/navigation";
import jsonwebtoken from "jsonwebtoken";

export const useScroll = (last_index: number, flags?: Dispatch<SetStateAction<FeatureFlag[]>>) => {
  const [loading, SetLoading] = useState(false);
  const [new_flags, setNewFlags] = useState<FeatureFlag[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const router = useRouter();

  useEffect(() => {
    SetLoading(true);

    try {
      const query = `${NEXT_FEATURE_FLAG_URL}?index=${last_index}`;

      fetch(query, { headers: {} })
        .then((res) => {
          res.json().then((res) => {
            const length = res.length;

            if (res.status === 401) {
              alert("Sua sessão Expirou");
              return router.push("/login");
            }

            setNewFlags((prevFlags) => {
              return [...prevFlags, ...res.json];
            });

            setHasMore(res.json.length > 0);
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
    } catch (error) {
      SetLoading(false);
    }
  }, [last_index]);

  return { loading, new_flags, hasMore };
};
