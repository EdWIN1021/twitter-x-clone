import { auth } from "../lib/firebase";

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