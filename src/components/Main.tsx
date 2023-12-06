import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";

const Main = () => {
  return (
    <div className="min-h-[100vh] w-[600px] border-x">
      <MainTab />
      <PostForm />
      <Tweets />
    </div>
  );
};

export default Main;
