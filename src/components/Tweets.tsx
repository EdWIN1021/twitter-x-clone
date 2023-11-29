import { TailSpin } from "react-loader-spinner";
import useTweets from "../hooks/useTweets";
import TweetItem from "./TweetItem";

const Tweets: React.FC = () => {
  const { tweets, loading } = useTweets();

  return (
    <>
      {loading ? (
        <div className="relative h-full">
          <div className="absolute left-1/2 top-[30%] -translate-x-1/2">
            <TailSpin
              height="80"
              width="80"
              color="#1D9BF0"
              radius="1"
              visible={true}
            />
          </div>
        </div>
      ) : (
        <>
          {tweets.map((tweet, index) => (
            <TweetItem key={index} tweet={tweet} />
          ))}
        </>
      )}
    </>
  );
};

export default Tweets;
