import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useContext, useState } from "react";
import useUsers from "../hooks/useUsers";
import { db } from "../lib/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";

const Search = () => {
  const { users } = useUsers();
  const [active, setActive] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleClick = async (id: string) => {
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser?.uid), {
        following: arrayUnion(id),
      });
    }
  };

  return (
    <div>
      <div className="px-7 py-4">
        <div
          className={clsx("flex rounded-full bg-[rgba(247,249,249)] p-4", {
            "border border-primary": active,
          })}
        >
          <MagnifyingGlassIcon
            className={clsx("w-5 stroke-2", {
              "stroke-primary": active,
            })}
          />
          <input
            className="w-full bg-[rgba(247,249,249)] pl-2 outline-none"
            type="text"
            placeholder="Search"
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
          />
        </div>
      </div>

      <div className="px-7">
        <div className="rounded-2xl bg-[rgba(247,249,249)]">
          <h2 className="px-4 py-3 text-[20px] font-extrabold">
            {" "}
            Who to follow
          </h2>

          <>
            {users?.map((user) => (
              <div className="flex items-center px-4 py-3" key={user.username}>
                <div className="mr-3 w-10 cursor-pointer">
                  <img
                    className="rounded-full"
                    src={user.photoURL || "/default_profile.png"}
                    alt="default..."
                  />
                </div>

                <div className="mr-12 flex flex-1 flex-col text-[15px]">
                  <span className="font-bold">{user.displayName}</span>
                  <span className="text-label">@{user.username}</span>
                </div>

                {currentUser?.following?.includes(user.userId) ? (
                  <button
                    className="rounded-full bg-[rgb(0,0,0,0.2)] px-3 py-1 text-[14px] font-bold text-white"
                    disabled
                  >
                    Following
                  </button>
                ) : (
                  <button
                    className="rounded-full bg-[rgb(15,20,25)] px-3 py-1 text-[14px] font-bold text-white"
                    onClick={() => handleClick(user.userId)}
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default Search;
