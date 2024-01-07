import { useContext, useEffect, useState } from "react";
import { Tweet } from "../types";
import { getUserTweets } from "../utils/tweet";
import { AuthContext } from "../contexts/AuthContext";
import { PostgrestResponse } from "@supabase/supabase-js";

const useUserTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { data, error } = (await getUserTweets(
          currentUser?.id,
        )) as PostgrestResponse<Tweet>;
        if (data && !error) {
          setTweets(data);
        }
      }
    })();
  }, [currentUser]);

  return { tweets };
};

export default useUserTweets;
