import { useContext, useEffect, useMemo, useState } from "react";
import { Like, Reply, Tweet } from "../types";

import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDateRange } from "../utils/date";
import { createLikes, getLikes, getTotalReplies } from "../utils/tweet";
import clsx from "clsx";
import ReplyModal from "./ReplyModal";

const TweetItem: React.FC<{ tweet: Tweet | Reply; showBar?: boolean }> = ({
  tweet,
  showBar,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [totalReplies, setTotalReplies] = useState<number | null>(0);
  const [likes, setLikes] = useState<Like[] | []>([]);
  const navigate = useNavigate();
  const [open, toggle] = useState(false);

  useEffect(() => {
    (async () => {
      if (tweet) {
        const response = await getTotalReplies(tweet?.id);
        if (response.status === 200) {
          setTotalReplies(response.count);
        }
      }
    })();
  }, [tweet]);

  useEffect(() => {
    (async () => {
      if (tweet) {
        const response = await getLikes(tweet?.id);
        if (response.status === 200) {
          setLikes(response?.data as Like[]);
        }
      }
    })();
  }, [tweet]);

  const isLiked = useMemo(
    () =>
      likes.some(
        (like) =>
          currentUser &&
          like.user_id === currentUser.id &&
          tweet.id === like.tweet_id,
      ),
    [likes, currentUser, tweet.id],
  );

  const handleReply = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggle(true);
  };

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (currentUser) {
      await createLikes(currentUser?.id, tweet?.id);
      const response = await getLikes(tweet.id);
      setLikes(response.data as Like[]);
    }
  };

  return (
    <>
      <div
        className={clsx("cursor-pointer ", { "border-b": !showBar })}
        onClick={() =>
          navigate(`/home/tweet/${tweet.id}`, { state: { tweet } })
        }
      >
        {currentUser && tweet && (
          <div className="flex  px-4 pb-3 pt-4 hover:bg-[rgba(0,0,0,0.03)]">
            <div className="mr-2 flex flex-col items-center ">
              <div className="w-10 cursor-pointer">
                <img
                  className="rounded-full"
                  src={tweet?.profiles?.avatar_url || "/default_profile.png"}
                  alt="default..."
                />
              </div>

              {showBar && (
                <div className="mt-2 w-0.5 flex-1 bg-[rgb(207,217,222)]"></div>
              )}
            </div>

            <div className="flex-1">
              <div>
                <span className="font-bold">{tweet.profiles?.full_name}</span>
                <span className="ml-1 text-label">
                  @{tweet.profiles?.username} &middot;{" "}
                  {getDateRange(new Date(tweet?.created_at))}
                </span>
              </div>
              <p>{tweet?.content}</p>
              {tweet?.image_url && (
                <div className="relative mt-2 h-[288px] w-full overflow-hidden rounded-2xl">
                  <img
                    className="h-full w-full"
                    src={tweet?.image_url}
                    alt=""
                  />
                </div>
              )}

              <div className="flex justify-around pt-3 text-sm">
                <div
                  className="group flex cursor-pointer items-center text-label hover:text-primary-blue"
                  onClick={handleReply}
                >
                  <div className="rounded-full p-2 group-hover:bg-secondary-blue">
                    <ChatBubbleOvalLeftIcon className="w-5  stroke-[2px]" />
                  </div>
                  <span>{totalReplies}</span>
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
                        "fill-[rgb(249,24,128)] text-[rgb(249,24,128)]":
                          isLiked,
                      })}
                    />
                  </div>
                  <span>{likes?.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {open && <ReplyModal toggle={toggle} tweet={tweet} />}
    </>
  );
};

export default TweetItem;
