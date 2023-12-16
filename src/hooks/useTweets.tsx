import { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Tweet } from "../types";
import { AuthContext } from "../contexts/AuthContext";

const useTweets = () => {
  const { currentUser } = useContext(AuthContext);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    (async () => {
      const userRef = doc(db, "users", currentUser!.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const q = query(
          collection(db, "posts"),
          where("userId", "in", userSnap.data().following),
          orderBy("timestamp", "desc"),
        );

        unsubscribe = onSnapshot(q, async (querySnapshot) => {
          const posts = [] as Tweet[];
          querySnapshot.forEach((doc) => {
            posts.push({ ...doc.data(), tweetId: doc.id } as Tweet);
          });
          setTweets(posts);
        });
      }
    })();

    return () => unsubscribe();
  }, [currentUser]);

  return { tweets };
};

export default useTweets;
