import { Tweet } from "../types";
import TweetItem from "./TweetItem";

const Tweets: React.FC<{ tweets: Tweet[] }> = ({ tweets }) => {
  console.log(tweets);
  return (
    <div>
      {tweets.map((tweet, index) => (
        <TweetItem key={index} tweet={tweet} />
      ))}
    </div>
  );
};

export default Tweets;
