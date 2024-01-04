import { useEffect, useState } from "react";
import { getLikedTweets } from "../utils/tweet";
import { Profiles, Tweet } from "../types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface Data {
  id: string;
  profiles: Profiles;
  tweets: Tweet;
}

const useLikedTweets = (user_id: string) => {
  const [data, setData] = useState<Data[] | null>([]);

  useEffect(() => {
    (async () => {
      const response = (await getLikedTweets(
        user_id,
      )) as PostgrestSingleResponse<Data[]>;

        

      if (response.status === 200) {
        setData(response?.data);
      }
    })();
  }, [user_id]);

  console.log(data);

  return { data };
};

export default useLikedTweets;
