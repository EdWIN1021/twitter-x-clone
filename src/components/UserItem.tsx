import { Profiles } from "../types";

const UserItem: React.FC<{
  user: Profiles;
  following?: string[];
  handleClick: (id: string) => void;
}> = ({ user }) => {
  // const [isFollowing, setIsFollowing] = useState(false);

  

  return (
    <div className="flex items-center px-4 py-3" key={user.username}>
      <div className="mr-3 w-10 cursor-pointer">
        <img
          className="rounded-full"
          src={user.avatar_url || "/default_profile.png"}
          alt="default..."
        />
      </div>
      <div className="mr-12 flex flex-1 flex-col">
        <span className="whitespace-nowrap font-bold">{user.full_name}</span>
        <span className="text-label">@{user.username}</span>
      </div>
      {/* <button
        className="rounded-full bg-btn-black px-3 py-1 text-sm font-bold text-white"
        disabled
      >
        Following
      </button> */}
      <button
        className="rounded-full bg-[rgb(15,20,25)] px-3 py-1 text-sm font-bold text-white"
        onClick={() => {
          // setIsFollowing(true);
        }}
      >
        Follow
      </button>
    </div>
  );
};

export default UserItem;
