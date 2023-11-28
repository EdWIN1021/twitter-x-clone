import { useContext, useEffect, useState } from "react";
import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";
import { AuthContext } from "../contexts/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Tweet } from "../types";

const Main = () => {
  const { currentUser } = useContext(AuthContext);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    // useTweets
    const data = [] as Tweet[];
    const getTweets = async () => {
      const q = query(
        collection(db, "posts"),
        where("userId", "in", currentUser?.following)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => data.push(doc.data() as Tweet));
      setTweets(data);
    };
    getTweets();

    return () => {
      getTweets();
    };
  }, [currentUser]);

  return (
    <div className="w-[550px] justify-center border-x overflow-y-auto">
      <MainTab />
      <PostForm />
      <Tweets tweets={tweets} />
    </div>
  );
};

export default Main;
