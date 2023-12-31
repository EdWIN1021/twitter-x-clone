import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import useUsers from "../hooks/useUsers";
import UserItem from "./UserItem";

const Search = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const { users } = useUsers(search);

  const handleClick = async () => {};

  return (
    <div className="hidden md:block">
      <div className="px-7 py-4">
        <div
          className={clsx("flex rounded-full bg-[rgba(247,249,249)] p-4", {
            "border-primary border": active,
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
          />
        </div>
      </div>

      <div className="px-7">
        <div className="min-w-[332px] rounded-2xl bg-[rgba(247,249,249)]">
          <h2 className="px-4 py-3 text-lg font-extrabold"> Who to follow</h2>

          <>
            {users?.map((user) => (
              <div key={user?.id}>
                <UserItem user={user} handleClick={handleClick} />
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default Search;
