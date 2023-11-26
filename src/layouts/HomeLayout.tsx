import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

const HomeLayout = () => {
  return (
    <div className="h-[100vh] flex justify-center">
      <SideNav />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
