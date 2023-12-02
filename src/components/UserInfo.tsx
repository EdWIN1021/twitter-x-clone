import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import LogOut from "./LogOut";
import { AuthContext } from "../contexts/AuthContext";
import Skeleton from "react-loading-skeleton";

const UserInfo: React.FC = () => {
  const [open, toggle] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="relative">
      <>
        <div
          className="w-[244px] cursor-pointer rounded-full px-3 py-1 hover:bg-hover-gray"
          onClick={() => toggle((open) => !open)}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 cursor-pointer">
              {currentUser ? (
                <img
                  className="rounded-full"
                  src={currentUser?.photoURL || "/default_profile.png"}
                  alt="default..."
                />
              ) : (
                <Skeleton circle width={30} height={30} />
              )}
            </div>

            <div className="flex flex-col text-[15px]">
              <>
                <span className="whitespace-nowrap font-bold">
                  {currentUser ? (
                    currentUser?.displayName
                  ) : (
                    <Skeleton width={123} />
                  )}
                </span>

                <span className="self-start text-label">
                  {currentUser ? (
                    `@${currentUser!.username}`
                  ) : (
                    <Skeleton width={75} />
                  )}
                </span>
              </>
            </div>

            <EllipsisHorizontalIcon className="ml-7 w-7 cursor-pointer" />
          </div>
        </div>

        {open && <LogOut toggle={toggle} username={currentUser?.username} />}
      </>
    </div>
  );
};

export default UserInfo;
