import { useContext, useMemo } from "react";
import { Tweet } from "../types";

import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import clsx from "clsx";

const TweetItem: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const { currentUser } = useContext(AuthContext);

  const isLiked = useMemo(() => {
    if (currentUser) {
      return tweet.likes.includes(currentUser?.uid);
    }
  }, [tweet.likes, currentUser]);

  const handleLike = async () => {
    if (!isLiked) {
      await updateDoc(doc(db, "posts", tweet.tweetId), {
        likes: arrayUnion(currentUser?.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", tweet.tweetId), {
        likes: arrayRemove(currentUser?.uid),
      });
    }
  };

  return (
    <>
      {currentUser && (
        <div className="flex border-b px-4 pb-3 pt-4">
          <div className="mr-3 w-10 cursor-pointer">
            <img
              className="rounded-full"
              src={tweet?.photoURL || "/default_profile.png"}
              alt="default..."
            />
          </div>

          <div className="flex-1">
            <div>
              <span className="font-bold">{tweet.displayName}</span>
              <span className="ml-1 text-label">
                @{tweet.username} &middot; 18h
              </span>
            </div>
            <p>{tweet?.content}</p>
            {tweet?.postImageUrl && (
              <div className="relative mt-2 h-[288px] w-full overflow-hidden rounded-2xl">
                <img
                  className="h-full w-full"
                  src={tweet?.postImageUrl}
                  alt=""
                />
              </div>
            )}

            <div className="flex justify-around pt-3 text-sm">
              <div className="group flex cursor-pointer items-center text-label hover:text-[rgba(29,155,240)]">
                <div className="rounded-full p-2 group-hover:bg-[rgba(29,155,240,0.2)]">
                  <ChatBubbleOvalLeftIcon className="w-5  stroke-[2px]" />
                </div>
                <span>12k</span>
              </div>

              <div className="group flex cursor-pointer  items-center text-label hover:text-[rgba(0,186,124)]">
                <div className="rounded-full p-2 group-hover:bg-[rgba(0,186,124,0.1)]">
                  <ArrowPathRoundedSquareIcon className="w-5 stroke-[2px]" />
                </div>
                <span>17k</span>
              </div>

              <div
                className="group flex cursor-pointer items-center text-label hover:text-[rgb(249,24,128)]"
                onClick={handleLike}
              >
                <div className="rounded-full p-2  group-hover:bg-[rgba(249,24,128,0.1)]">
                  <HeartIcon
                    className={clsx("w-5", {
                      "fill-[rgb(249,24,128)] text-[rgb(249,24,128)]": isLiked,
                    })}
                  />
                </div>
                <span>{tweet?.likes.length > 0 ? tweet?.likes.length : 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TweetItem;
