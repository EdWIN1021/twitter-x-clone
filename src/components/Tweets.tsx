import useTweets from "../hooks/useTweets";
import TweetItem from "./TweetItem";

const Tweets: React.FC = () => {
  const { tweets } = useTweets();

  return (
    <>
      {tweets &&
        tweets.map((tweet, index) => <TweetItem key={index} tweet={tweet} />)}
    </>
  );
};

export default Tweets;
