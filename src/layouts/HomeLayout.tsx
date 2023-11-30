import { Navigate, Outlet } from "react-router-dom";
import SideNav from "../components/SideBar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
const HomeLayout = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser?.username ? (
        <div className="flex h-[100vh] justify-center">
          <SideNav />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/username" />
      )}
    </>
  );
};

export default HomeLayout;
