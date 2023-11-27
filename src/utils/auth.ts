import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    }, 200);
  });
};

export const getUserProfile = async (id: string) => {
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  }

  return null;
};
