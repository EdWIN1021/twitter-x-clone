import { useState } from "react";
import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";

const Main = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-[100vh] w-full max-w-[600px] border-x md:min-w-[600px]">
      <MainTab tab={tab} setTab={setTab} />
      <PostForm placeholder={"What is happening?!"} type={"post"} />
      {tab === 0 && <Tweets />}
    </div>
  );
};

export default Main;
