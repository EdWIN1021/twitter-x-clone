import { useContext } from "react";
import { Tweet } from "../types";

import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { getDateRange } from "../utils/date";

const TweetItem: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // const isLiked = useMemo(() => {
  //   if (currentUser) {
  //     return tweet.likes.includes(currentUser?.uid);
  //   }
  // }, [tweet.likes, currentUser]);

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation();

    // if (!isLiked) {
    //   await updateDoc(doc(db, "posts", tweet.tweetId), {
    //     likes: arrayUnion(currentUser?.uid),
    //   });
    // } else {
    //   await updateDoc(doc(db, "posts", tweet.tweetId), {
    //     likes: arrayRemove(currentUser?.uid),
    //   });
    // }
  };

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/home/post/${tweet.id}`, { state: { tweet } })}
    >
      {currentUser && tweet && (
        <div className="flex border-b px-4 pb-3 pt-4 hover:bg-[rgba(0,0,0,0.03)]">
          <div className="mr-3 w-10 cursor-pointer">
            <img
              className="rounded-full"
              src={tweet?.profiles.avatar_url || "/default_profile.png"}
              alt="default..."
            />
          </div>

          <div className="flex-1">
            <div>
              <span className="font-bold">{tweet.profiles.full_name}</span>
              <span className="ml-1 text-label">
                {/* @{tweet.profiles.full_name} &middot;{" "} */}
                {/* {getDateRange(tweet?.timestamp?.toDate())} */}
              </span>
            </div>
            <p>{tweet?.content}</p>
            {tweet?.image_url && (
              <div className="relative mt-2 h-[288px] w-full overflow-hidden rounded-2xl">
                <img className="h-full w-full" src={tweet?.image_url} alt="" />
              </div>
            )}

            <div className="flex justify-around pt-3 text-sm">
              <div className="group flex cursor-pointer items-center text-label hover:text-primary-blue">
                <div className="rounded-full p-2 group-hover:bg-secondary-blue">
                  <ChatBubbleOvalLeftIcon className="w-5  stroke-[2px]" />
                </div>
                <span>{tweet?.replies?.length}</span>
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
                  {/* <HeartIcon
                    className={clsx("w-5", {
                      "fill-[rgb(249,24,128)] text-[rgb(249,24,128)]": isLiked,
                    })}
                  /> */}
                </div>
                <span>{tweet?.likes?.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetItem;
