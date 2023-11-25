import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>home</h1>
      <button onClick={() => signOut(() => navigate("/"))}>Sign Out</button>
    </div>
  );
};

export default Home;
