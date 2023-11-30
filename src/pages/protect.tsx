import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { AuthContext } from "../contexts/AuthContext";

const Protect = () => {
  const { currentUser, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{currentUser?.username ? <Outlet /> : <Navigate to="/username" />}</>
      )}
    </>
  );
};

export default Protect;
