import { useContext, useEffect, useState } from "react";
import { Tweet } from "../types";
import { getUserTweets } from "../utils/tweet";
import { AuthContext } from "../contexts/AuthContext";

const useUserTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { data, error } = await getUserTweets(currentUser?.id);
        if (data && !error) {
          setTweets(data as Tweet[]);
        }
      }
    })();
  }, [currentUser]);

  return { tweets };
};

export default useUserTweets;
