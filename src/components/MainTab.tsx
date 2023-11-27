const MainTab = () => {
  return (
    <div className="flex items-center justify-center border-b">
      <button className="w-full  h-[53px] hover:bg-hover-gray group">
        <div className="text-label h-full inline-block font-semibold text-[15px] group-focus:border-primary group-focus:border-b-[3px] group-focus:font-bold group-focus:text-black">
          <div className="flex h-full flex-col items-center justify-center">
            <span>For you</span>
          </div>
        </div>
      </button>

      <button className="w-full  h-[53px] hover:bg-hover-gray group">
        <div className="text-label h-full inline-block font-semibold text-[15px] group-focus:border-primary group-focus:border-b-[3px] group-focus:font-bold group-focus:text-black">
          <div className="flex h-full flex-col items-center justify-center">
            <span>Following</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MainTab;
