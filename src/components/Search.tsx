import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useContext, useState } from "react";
import useUsers from "../hooks/useUsers";
import { db } from "../lib/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import UserItem from "./UserItem";

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
    <div className="hidden md:block">
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
              <div key={user?.userId}>
                <UserItem
                  user={user}
                  following={currentUser?.following || []}
                  handleClick={handleClick}
                />
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default Search;
