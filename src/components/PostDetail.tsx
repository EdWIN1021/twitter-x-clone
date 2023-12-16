import { Link, useLocation } from "react-router-dom";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TweetItem from "./TweetItem";
import PostForm from "./PostForm";

export const PostDetail = () => {
  const { state } = useLocation();

  return (
    <div className="min-h-[100vh] w-full max-w-[600px] border-x">
      <div className="flex items-center px-4 py-3">
        <Link to={"/home"}>
          <ArrowLeftIcon className="mr-5 w-5 cursor-pointer" />
        </Link>
        <span className="text-xl font-bold">Post</span>
      </div>

      <TweetItem tweet={state.tweet} />
      <PostForm placeholder={"Post your reply"} type={"Reply"} />
    </div>
  );
};
