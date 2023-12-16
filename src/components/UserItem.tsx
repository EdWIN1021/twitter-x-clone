import { useState } from "react";
import { CurrentUser } from "../types";

const UserItem: React.FC<{
  user: CurrentUser;
  following: string[];
  handleClick: (id: string) => void;
}> = ({ user, following, handleClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex items-center px-4 py-3" key={user.username}>
      <div className="mr-3 w-10 cursor-pointer">
        <img
          className="rounded-full"
          src={user.photoURL || "/default_profile.png"}
          alt="default..."
        />
      </div>

      <div className="mr-12 flex flex-1 flex-col">
        <span className="whitespace-nowrap font-bold">{user.displayName}</span>
        <span className="text-label">@{user.username}</span>
      </div>

      {following?.includes(user.userId) || isFollowing ? (
        <button
          className="bg-btn-black rounded-full px-3 py-1 text-sm font-bold text-white"
          disabled
        >
          Following
        </button>
      ) : (
        <button
          className="bg-btn-black rounded-full px-3 py-1 text-sm font-bold text-white"
          onClick={() => {
            handleClick(user.userId);
            setIsFollowing(true);
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserItem;
