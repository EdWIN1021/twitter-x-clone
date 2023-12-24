import { Outlet } from "react-router-dom";
import Search from "../components/Search";

const Home = () => {
  console.log("home");

  return (
    <div className="flex max-w-[900px] flex-1">
      <Outlet />
      <Search />
    </div>
  );
};

export default Home;
