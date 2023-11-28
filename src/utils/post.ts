import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export const createPost = async (
  userId: string,
  content: string,
  displayName: string | null,
  photoURL: string | null
) => {
  const docRef = await addDoc(collection(db, "posts"), {
    userId,
    content,
    displayName,
    photoURL,
    timestamp: serverTimestamp(),
  });

  return docRef;
};
