import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AppBar from "../components/AppBar";

const HomeLayout = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      {currentUser?.username ? (
        <div className="flex h-[100vh] justify-center">
          <SideBar />
          <Outlet />
          <AppBar />
        </div>
      ) : (
        <Navigate to="/username" />
      )}
    </div>
  );
};

export default HomeLayout;
