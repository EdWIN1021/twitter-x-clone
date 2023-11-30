import { Outlet } from "react-router-dom";
// import Loader from "../components/Loader";
// import { auth } from "../lib/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

const RootLayout = () => {
  // const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Outlet />
    </>
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <>{user && !error ? <Navigate to="/home" /> : <Outlet />}</>
    //   )}
    // </>
  );
};

export default RootLayout;
