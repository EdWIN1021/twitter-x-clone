import { redirect, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

export const Loader = async () => {
  try {
    const user = await getUser();
    if (user) {
      return redirect("/home");
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const RootLayout = () => {
  return <Outlet />;
};

export default RootLayout;
