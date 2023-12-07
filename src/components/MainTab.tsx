import { Dispatch, SetStateAction } from "react";

const MainTab: React.FC<{
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}> = ({ setTab, tab }) => {
  return (
    <div className="flex items-center justify-center border-b">
      <button
        className="h-[53px] w-full hover:bg-hover-gray"
        onClick={() => setTab(0)}
      >
        <div
          className={`inline-block h-full text-[15px] font-semibold text-label ${
            tab === 0 &&
            "border-primary-blue border-b-[3px] font-bold text-black"
          } `}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span>For you</span>
          </div>
        </div>
      </button>

      <button
        className="group  h-[53px] w-full hover:bg-hover-gray"
        onClick={() => setTab(1)}
      >
        <div
          className={`inline-block h-full text-[15px] font-semibold text-label ${
            tab === 1 &&
            "border-primary-blue border-b-[3px] font-bold text-black"
          } `}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span>Following</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MainTab;
