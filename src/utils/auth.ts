import { User } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";

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

export const initUserProfile = async (
  user: User,
  birthday?: Date,
  name?: string,
) => {
  await setDoc(doc(db, "users", user?.uid), {
    displayName: user.displayName || name,
    photoURL: user.photoURL,
    following: arrayUnion(user?.uid, "QSMl8KEEEsagd4fIbLOsoAHfLNA2"),
    username: "",
    birthday: birthday || "",
    userId: user?.uid,
  });
};
