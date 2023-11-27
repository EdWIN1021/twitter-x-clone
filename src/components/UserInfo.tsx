import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
const UserInfo = () => {
  const { currentUser } = useContext(AuthContext);

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
        <span className="font-bold">{currentUser?.displayName}</span>
        <span className="text-label">@{currentUser?.username}</span>
      </div>

      <EllipsisHorizontalIcon className="w-7 ml-7 cursor-pointer" />
    </div>
  );
};

export default UserInfo;
