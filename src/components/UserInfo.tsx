import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import LogOut from "./LogOut";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CurrentUser } from "../contexts/AuthContext";

const UserInfo: React.FC = () => {
  const [user] = useAuthState(auth);
  const [open, toggle] = useState(false);

  const { photoURL, displayName, username } = user as CurrentUser;

  return (
    <div className="relative">
      {user && (
        <>
          <div
            className="w-[244px] cursor-pointer rounded-full px-3 py-1 hover:bg-hover-gray"
            onClick={() => toggle((open) => !open)}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 cursor-pointer">
                <img
                  className="rounded-full"
                  src={photoURL || "/default_profile.png"}
                  alt="default..."
                />
              </div>

              <div className="flex flex-col text-[15px]">
                <>
                  <span className="whitespace-nowrap font-bold">
                    {displayName}
                  </span>
                  <span className="text-label">@{username}</span>
                </>
              </div>

              <EllipsisHorizontalIcon className="ml-7 w-7 cursor-pointer" />
            </div>
          </div>

          {open && <LogOut toggle={toggle} username={username} />}
        </>
      )}
    </div>
  );
};

export default UserInfo;
