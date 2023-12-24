import { Link, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TweetItem from "./TweetItem";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { Reply } from "../types";
import { getReplies } from "../utils/tweet";

const TweetDetail = () => {
  const { state } = useLocation();
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getReplies(state.tweet.id);
      if (response.status === 200) {
        console.log(response);
        setReplies(response.data as Reply[]);
      }
    })();

    return () => setReplies([]);
  }, [state.tweet]);

  return (
    <div className="min-h-[100vh] w-full max-w-[600px] border-x">
      <div className="flex items-center px-4 py-3">
        <Link to={"/home"}>
          <ArrowLeftIcon className="mr-5 w-5 cursor-pointer" />
        </Link>
        <span className="text-xl font-bold">Post</span>
      </div>

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
  );
};

export default TweetDetail;
