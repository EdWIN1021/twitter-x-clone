import { Link, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TweetItem from "./TweetItem";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { getReplies, getTweet } from "../utils/tweet";
import { supabase } from "../lib/supabase";
import { Tweet } from "../types";

const TweetDetail = () => {
  const { state } = useLocation();
  const [replies, setReplies] = useState<Tweet[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getReplies(state.tweet.id);
      if (data) setReplies(data);
    })();

    return () => setReplies([]);
  }, [state.tweet]);

  useEffect(() => {
    const subscription = supabase
      .channel("tweets_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tweets",
          filter: "type=eq.reply",
        },
        async (payload) => {
          const data = await getTweet(payload.new.id);
          if (data) {
            setReplies([data as Tweet, ...replies]);
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [replies]);

  return (
    <div className="min-h-[100vh] w-full max-w-[600px] border-x md:min-w-[600px]">
      <div className="flex items-center px-4 py-3">
        <Link to={"/home"}>
          <ArrowLeftIcon className="mr-5 w-5 cursor-pointer" />
        </Link>
        <span className="text-xl font-bold">Post</span>
      </div>

      <div className="h-[calc(100vh-52px)] overflow-y-auto">
        <TweetItem tweet={state.tweet} />

        <PostForm
          placeholder={"Post your reply"}
          type={"reply"}
          tweet={state.tweet}
        />

        {replies.map((reply) => (
          <TweetItem key={reply.id} tweet={reply} />
        ))}
      </div>
    </div>
  );
};

export default TweetDetail;
