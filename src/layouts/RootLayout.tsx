import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from "../components/Loader";
import {auth} from '../lib/firebase'


const RootLayout = () => {
  const [user, loading, error] = useAuthState(auth);

  if(loading){
    return <Loader/>
  }

  return(
  <>{user && !error ? <Navigate to='/home' /> : <Outlet />}
 </> 
  );
};

export default RootLayout;
