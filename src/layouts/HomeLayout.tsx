import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import AppBar from "../components/AppBar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const HomeLayout = () => {
  const { profile } = useContext(AuthContext);
  return (
    <>
      {profile?.username ? (
        <div className="flex h-[100vh] justify-center">
          <SideBar />
          <Outlet />
          <AppBar />
        </div>
      ) : (
        <Navigate to="/username" />
      )}
    </>
  );
};

export default HomeLayout;
