import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
const UserInfo = () => {
  return (
    <div className="flex items-center w-[244px] gap-2.5">
      <div className="w-10 cursor-pointer">
        <img
          className="rounded-full"
          src="/default_profile.png"
          alt="default..."
        />
      </div>

      <div className="flex flex-col text-[15px]">
        <span className="font-bold">Edwin Shi</span>
        <span className="text-label">@EdwinShi978121</span>
      </div>

      <EllipsisHorizontalIcon className="w-7 ml-7" />
    </div>
  );
};

export default UserInfo;
