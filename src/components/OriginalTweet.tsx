import { useEffect, useState } from "react";
import { getTweet } from "../utils/tweet";
import { getDateRange } from "../utils/date";
import { Tweet } from "../types";

const OriginalTweet: React.FC<{ tweetId: string }> = ({ tweetId }) => {
  const [tweet, setTweet] = useState<Tweet | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getTweet(tweetId);
      setTweet(data as Tweet);
    })();
  }, [tweetId]);

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border p-2">
      <div className="flex items-center gap-1">
        <div className="w-5 cursor-pointer">
          <img
            className="rounded-full"
            src={tweet?.profiles?.avatar_url || "/default_profile.png"}
            alt="default..."
          />
        </div>

        <span className="font-bold">{tweet?.profiles?.full_name}</span>
        <span className="text-label">
          @{tweet?.profiles?.username} &middot;{" "}
          {getDateRange(new Date(tweet?.created_at || new Date()))}
        </span>
      </div>

      <p className="break-all">{tweet?.content}</p>
    </div>
  );
};

export default OriginalTweet;
