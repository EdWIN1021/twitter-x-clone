import { useEffect, useState } from "react";
import { Reply, Tweet } from "../types";
import { getTweet } from "../utils/tweet";
import TweetItem from "./TweetItem";

const ReplyItem: React.FC<{ userReply: Reply }> = ({ userReply }) => {
  const [tweet, setTweet] = useState<Tweet>();

  useEffect(() => {
    (async () => {
      const data = await getTweet(userReply.tweet_id);
      if (data) {
        setTweet(data as Tweet);
      }
    })();
  }, [userReply]);

  return (
    <>
      {tweet && (
        <>
          <TweetItem tweet={tweet} showBar />
          <TweetItem tweet={userReply} />
        </>
      )}
    </>
  );
};

export default ReplyItem;
