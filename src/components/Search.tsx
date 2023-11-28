const Search = () => {
  return (
    <div>
      <div className="p-7">
        <div className="bg-[rgba(247,249,249)] rounded-2xl">
          <h2 className="text-[20px] font-extrabold py-3 px-4">
            {" "}
            Who to follow
          </h2>

          <div className="flex items-center py-3 px-4">
            <div className="w-10 cursor-pointer mr-3">
              <img
                className="rounded-full"
                src={"/default_profile.png"}
                alt="default..."
              />
            </div>

            <div className="flex flex-col text-[15px] mr-12">
              <span className="font-bold">Yang Shi</span>
              <span className="text-label">@edwinshi1021</span>
            </div>

            <button className="bg-[rgb(15,20,25)] text-white py-1 px-3 rounded-full text-[14px] font-bold">
              Follow
            </button>
          </div>

          <div className="flex items-center py-3 px-4">
            <div className="w-10 cursor-pointer mr-3">
              <img
                className="rounded-full"
                src={"/default_profile.png"}
                alt="default..."
              />
            </div>

            <div className="flex flex-col text-[15px] mr-12">
              <span className="font-bold">Yang Shi</span>
              <span className="text-label">@edwinshi1021</span>
            </div>

            <button className="bg-[rgb(15,20,25)] text-white py-1 px-3 rounded-full text-[14px] font-bold">
              Follow
            </button>
          </div>

          <div className="flex items-center py-3 px-4">
            <div className="w-10 cursor-pointer mr-3">
              <img
                className="rounded-full"
                src={"/default_profile.png"}
                alt="default..."
              />
            </div>

            <div className="flex flex-col text-[15px] mr-12">
              <span className="font-bold">Yang Shi</span>
              <span className="text-label">@edwinshi1021</span>
            </div>

            <button className="bg-[rgb(15,20,25)] text-white py-1 px-3 rounded-full text-[14px] font-bold">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
