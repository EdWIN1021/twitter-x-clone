import { Tweet } from "../types";

import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const TweetItem: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  console.log(tweet);

  return (
    <div className="flex pt-4 px-4 pb-3 border-b">
      <div className="w-10 cursor-pointer mr-3">
        <img
          className="rounded-full"
          src={tweet?.photoURL || "/default_profile.png"}
          alt="default..."
        />
      </div>

      <div className="flex-1">
        <div className="text-[15px]">
          <span className="font-bold">{tweet.displayName}</span>
          <span className="text-label ml-1">@{tweet.username} &#8226; 18h</span>
        </div>

        <p>{tweet?.content}</p>
        {tweet?.postImageUrl && (
          <div className="w-full h-[288px] rounded-2xl overflow-hidden relative mt-2">
            <img className="w-full h-full" src={tweet?.postImageUrl} alt="" />
          </div>
        )}

        <div className="flex justify-around pt-3">
          <div className="text-[13px] text-label flex items-center">
            <div className="p-2 hover:bg-hover-gray rounded-full cursor-pointer">
              <ChatBubbleOvalLeftIcon className="w-5  stroke-[2px]" />
            </div>
            <span>12k</span>
          </div>

          <div className="text-[13px] text-label flex items-center">
            <div className="p-2 hover:bg-hover-gray rounded-full cursor-pointer">
              <ArrowPathRoundedSquareIcon className="w-5 stroke-[2px]" />
            </div>
            <span>17k</span>
          </div>

          <div className="text-[13px] text-label flex items-center">
            <div className="p-2 hover:bg-hover-gray rounded-full cursor-pointer ">
              <HeartIcon className="w-5 stroke-[2px]" />
            </div>
            <span>110k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
