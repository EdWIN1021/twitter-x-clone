import { useContext, useEffect, useState } from "react";
import { Tweet } from "../types";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import TweetItem from "./TweetItem";

const FollowingTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const temp: string[] = [];
        const { data: followings } = await supabase
          .from("followers")
          .select("user_id")
          .eq("follower_user_id", currentUser?.id);
        followings?.forEach((item) => temp.push(item.user_id));

        const { data, error } = await supabase
          .from("tweets")
          .select(
            `
            id,
            content,
            type,
            image_url,
            created_at,
            profiles(id, full_name, avatar_url, username)
          `,
          )
          .eq("type", "post")
          .in("user_id", temp)
          .order("created_at", { ascending: false });

        if (data && !error) setTweets(data as Tweet[]);
      }
    })();
  }, [currentUser]);

  return (
    <>
      {tweets &&
        tweets.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)}
    </>
  );
};

export default FollowingTweets;
