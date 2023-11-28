import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogOut from "./LogOut";

const UserInfo: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [open, toggle] = useState(false);

  return (
    <div className="relative">
      <div
        className="rounded-full px-3 py-1 w-[244px] hover:bg-hover-gray cursor-pointer"
        onClick={() => toggle((open) => !open)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-10 cursor-pointer">
            <img
              className="rounded-full"
              src={currentUser?.photoURL || "/default_profile.png"}
              alt="default..."
            />
          </div>

          <div className="flex flex-col text-[15px]">
            <span className="font-bold whitespace-nowrap">
              {currentUser?.displayName}
            </span>
            <span className="text-label">@{currentUser?.username}</span>
          </div>

          <EllipsisHorizontalIcon className="w-7 ml-7 cursor-pointer" />
        </div>
      </div>

      {open && <LogOut toggle={toggle} username={currentUser?.username} />}
    </div>
  );
};

export default UserInfo;
