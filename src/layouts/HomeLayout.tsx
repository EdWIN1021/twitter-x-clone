import { Outlet } from "react-router-dom";
import SideNav from "../components/SideBar";

const HomeLayout = () => {
  return (
    <div className="flex h-[100vh] justify-center">
      <SideNav />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
