import Main from "../components/Main";
import Search from "../components/Search";

const Home = () => {
  return (
    //flex
    <div className="w-full max-w-[1350px] lg:flex">
      <Main />
      <Search />
    </div>
  );
};

export default Home;
