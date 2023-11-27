import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import Search from "../components/Search";

const Home = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Main />
      <Search />

      <button onClick={() => signOut(() => navigate("/"))}>Sign Out</button>
    </div>
  );
};

export default Home;
