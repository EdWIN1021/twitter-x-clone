import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";

const Main = () => {
  return (
    <div className="flex-1 justify-center overflow-y-auto border-x ">
      <MainTab />
      <PostForm />
      <Tweets />
    </div>
  );
};

export default Main;
