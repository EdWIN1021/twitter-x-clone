import { Outlet, redirect } from "react-router-dom";
import SideNav from "../components/SideBar";
import { getUser } from "../utils/auth";
import { User } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const Loader = async () => {
  try {
    const user = (await getUser()) as User;
    if (user) {
      const docRef = doc(db, "users", user?.uid);
      const data = (await getDoc(docRef))?.data();

      console.log(data);

      if (!data?.username) {
        return redirect("/username");
      }
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const HomeLayout = () => {
  return (
    <div className="h-[100vh] flex justify-center">
      <SideNav />
      <Outlet />
    </div>
  );
};

export default HomeLayout;