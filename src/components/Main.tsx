import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";

const Main = () => {
  return (
    <div className="w-[550px] justify-center overflow-y-auto border-x">
      <MainTab />
      <PostForm />
      <Tweets />
    </div>
  );
};

export default Main;
