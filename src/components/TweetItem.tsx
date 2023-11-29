import { Tweet } from "../types";

import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const TweetItem: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  return (
    <div className="flex border-b px-4 pb-3 pt-4">
      <div className="mr-3 w-10 cursor-pointer">
        <img
          className="rounded-full"
          src={tweet?.photoURL || "/default_profile.png"}
          alt="default..."
        />
      </div>

      <div className="flex-1">
        <div className="text-[15px]">
          <span className="font-bold">{tweet.displayName}</span>
          <span className="ml-1 text-label">@{tweet.username} &#8226; 18h</span>
        </div>

        <p>{tweet?.content}</p>
        {tweet?.postImageUrl && (
          <div className="relative mt-2 h-[288px] w-full overflow-hidden rounded-2xl">
            <img className="h-full w-full" src={tweet?.postImageUrl} alt="" />
          </div>
        )}

        <div className="flex justify-around pt-3">
          <div className="flex items-center text-[13px] text-label">
            <div className="cursor-pointer rounded-full p-2 hover:bg-hover-gray">
              <ChatBubbleOvalLeftIcon className="w-5  stroke-[2px]" />
            </div>
            <span>12k</span>
          </div>

          <div className="flex items-center text-[13px] text-label">
            <div className="cursor-pointer rounded-full p-2 hover:bg-hover-gray">
              <ArrowPathRoundedSquareIcon className="w-5 stroke-[2px]" />
            </div>
            <span>17k</span>
          </div>

          <div className="flex items-center text-[13px] text-label">
            <div className="cursor-pointer rounded-full p-2 hover:bg-hover-gray ">
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
