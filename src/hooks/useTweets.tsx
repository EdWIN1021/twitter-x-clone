import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Tweet } from "../types";
import { AuthContext } from "../contexts/AuthContext";

const useTweets = () => {
  const { currentUser } = useContext(AuthContext);

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getTweets = async () => {
      setLoading(true);
      const data = [] as Tweet[];
      try {
        const q = query(
          collection(db, "posts"),
          where("userId", "in", currentUser?.following),
          orderBy("timestamp", "desc"),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => data.push(doc.data() as Tweet));
        setTweets(data);
      } catch (err) {
        console.log(err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    getTweets();

    return () => {
      getTweets();
    };
  }, [currentUser?.following]);

  return { tweets, loading };
};

export default useTweets;
