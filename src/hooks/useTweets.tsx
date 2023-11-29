import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Tweet } from "../types";
import { CurrentUser } from "../contexts/AuthContext";

const useTweets = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { following } = user as CurrentUser;
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getTweets = async () => {
      setLoading(true);
      const data = [] as Tweet[];
      try {
        const q = query(
          collection(db, "posts"),
          where("userId", "in", following),
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

    if (!userLoading && !userError) {
      getTweets();
    }

    return () => {
      getTweets();
    };
  }, [following, userLoading, userError]);

  return { tweets, loading };
};

export default useTweets;
