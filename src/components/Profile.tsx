import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import moment from "moment";
import clsx from "clsx";
import useUserTweets from "../hooks/useUserTweets";
import TweetItem from "./TweetItem";
import useLikedTweets from "../hooks/useLikes";

const tabs = ["posts", "replies", "likes"];

const Profile = () => {
  const { profile, currentUser } = useContext(AuthContext);
  const { tweets } = useUserTweets();
  const { data: likedTweets } = useLikedTweets(currentUser?.id as string);
  const [tab, setTab] = useState("posts");

  console.log(likedTweets);

  return (
    <div className="min-h-[100vh] w-full max-w-[600px] border-x">
      <div className="flex items-center px-4 py-3">
        <Link to={"/home"}>
          <ArrowLeftIcon className="mr-5 w-5 cursor-pointer" />
        </Link>
        <span className="text-xl font-bold">{profile?.full_name}</span>
      </div>

      <div className="relative pb-6">
        <div className="h-[150px] bg-[rgb(207,217,222)]"></div>
        <div className="mt-[70px] px-4">
          <div className="mb-3">
            <h2 className="text-[20px] font-extrabold">{profile?.full_name}</h2>
            <span className="text-label">@{profile?.username}</span>
          </div>

          <div className="mb-3 flex">
            <CalendarDaysIcon className="w-4" />
            <span className="mx-2 text-label">
              Joined {moment(profile?.created_at).format("MMMM YYYY")}
            </span>
          </div>

          <div className="flex gap-2">
            <div className="text-[14px] ">
              <span className="font-bold">0</span>{" "}
              <span className="text-label">Following</span>
            </div>

            <div className="text-[14px] ">
              <span className="font-bold">0</span>{" "}
              <span className="text-label">Followers</span>
            </div>
          </div>
        </div>

        <img
          className="absolute left-[2%] top-[22%] h-[134px] w-[134px] rounded-full border-2 border-white"
          src="/default_profile.png"
        ></img>
      </div>

      <div className="flex justify-between border-b px-4">
        {tabs.map((tabItem) => (
          <button
            key={tabItem}
            className={clsx("px-6 py-2 font-bold hover:bg-hover-gray", {
              "border-b-2 border-primary-blue": tab === tabItem,
            })}
            onClick={() => setTab(tabItem)}
          >
            {tabItem}
          </button>
        ))}
      </div>
      {tab === "posts" && (
        <div>
          {tweets.map((tweet) => (
            <TweetItem key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
      {tab === "replies" && <div>replies</div>}
      {tab === "likes" && (
        <div>
          {likedTweets?.map((likedTweet) => (
            <TweetItem
              key={likedTweet.id}
              tweet={{
                id: likedTweet.tweets.id,
                content: likedTweet.tweets?.content,
                profiles: likedTweet.profiles,
                created_at: likedTweet.tweets.created_at,
                type: likedTweet.tweets.type,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;