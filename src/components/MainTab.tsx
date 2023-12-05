const MainTab = () => {
  return (
    <div className="flex items-center justify-center border-b">
      <button className="group  h-[53px] w-full hover:bg-hover-gray">
        <div className="inline-block h-full text-[15px] font-semibold text-label group-focus:border-b-[3px] group-focus:border-primary group-focus:font-bold group-focus:text-black">
          <div className="flex h-full flex-col items-center justify-center">
            <span>For you</span>
          </div>
        </div>
      </button>

      <button className="group  h-[53px] w-full hover:bg-hover-gray">
        <div className="inline-block h-full text-[15px] font-semibold text-label group-focus:border-b-[3px] group-focus:border-primary group-focus:font-bold group-focus:text-black">
          <div className="flex h-full flex-col items-center justify-center">
            <span>Following</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MainTab;
