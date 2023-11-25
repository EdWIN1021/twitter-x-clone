import { Outlet, redirect } from "react-router-dom";
import { getUser } from "../utils/auth";

export const Loader = async () => {
  try {
    await getUser();
  } catch (error) {
    return redirect("/");
  }
  return null;
};

const Protect = () => {
  return <Outlet />;
};

export default Protect;
