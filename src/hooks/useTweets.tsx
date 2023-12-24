import { useEffect, useState } from "react";
import { Tweet } from "../types";
import { supabase } from "../lib/supabase";

const useTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("tweets")
        .select(
          `
        id,
        content,
        type,
        created_at,
        profiles(id, full_name, avatar_url, username)
      `,
        )
        .eq("type", "post");

      if (data && !error) {
        setTweets(data as Tweet[]);
      }
    })();
  }, []);

  return { tweets };
};

export default useTweets;
