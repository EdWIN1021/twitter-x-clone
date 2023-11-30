import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../components/Loader";

const Protect = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{user && !error ? <Outlet /> : <Navigate to="/" replace={true} />}</>
      )}
    </>
  );
};

export default Protect;
