import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";

const Main = () => {
  return (
    <div className="min-h-[100vh] border-x xl:w-[600px]">
      <MainTab />
      <PostForm />
      <Tweets />
    </div>
  );
};

export default Main;
