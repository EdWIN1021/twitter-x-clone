import { Link, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TweetItem from "./TweetItem";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { Tweet } from "../types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export const PostDetail = () => {
  const { state } = useLocation();
  const [replies, setReplies] = useState<Tweet[]>([]);

  useEffect(() => {
    // change to realtime
    (async () => {
      const data = [] as Tweet[];
      const q = query(
        collection(db, "posts"),
        where("tweetId", "in", state.tweet.replies),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => data.push(doc.data() as Tweet));
      setReplies(data);
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
        tweetId={state.tweet.tweetId}
      />

      {replies.map((reply) => (
        <TweetItem key={reply.tweetId} tweet={reply} />
      ))}
    </div>
  );
};
