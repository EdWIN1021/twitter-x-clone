import { useEffect, useState } from "react";
import { Tweet } from "../types";
import { supabase } from "../lib/supabase";
import { getTweet, getTweets } from "../utils/tweet";

const useTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getTweets();
      if (data && !error) {
        setTweets(data as Tweet[]);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel("tweets_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tweets",
        },
        async (payload) => {
          const data = await getTweet(payload.new.id);
          if (data) {
            setTweets([data as Tweet, ...tweets]);
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tweets]);

  return { tweets };
};

export default useTweets;
