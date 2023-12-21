import { useState } from "react";
import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";

const Main = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-[100vh] w-full max-w-[600px] border-x">
      <MainTab tab={tab} setTab={setTab} />
      {tab === 0 && (
        <>
          <PostForm placeholder={"What is happening?!"} type={"post"} />
          <Tweets />
        </>
      )}
    </div>
  );
};

export default Main;
