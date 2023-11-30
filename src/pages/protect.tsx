import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../components/Loader";

const Protect = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{user && !error ? <Outlet /> : <Navigate to="/" replace />}</>
      )}
    </>
  );
};

export default Protect;
