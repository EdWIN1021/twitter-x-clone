import { Outlet } from "react-router-dom";
import SideNav from "../components/SideBar";
// import { getUser } from "../utils/auth";
// import { User } from "firebase/auth";

// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../lib/firebase";

// export const Loader = async () => {
//   try {
//     const user = (await getUser()) as User;
//     if (user) {
//       const docRef = doc(db, "users", user?.uid);
//       const data = (await getDoc(docRef))?.data();

//       if (!data?.username) {
//         return redirect("/username");
//       }
//     } else {
//       return redirect("/");
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

const HomeLayout = () => {
  return (
    <div className="flex h-[100vh] justify-center">
      <SideNav />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
