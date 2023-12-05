import Button from "../ui/Button";
import Logo from "../ui/Logo";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  QueueListIcon,
  UsersIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";

import NavLink from "./NavLink";
import UserInfo from "./UserInfo";

const SideBar = () => {
  return (
    <div className="mb-5 mt-4 hidden md:block xl:px-[100px]">
      <div className="flex flex-col items-center">
        <div className=" w-full justify-center px-7 md:flex md:justify-start">
          <Logo className="mb-2 w-7" />
        </div>
        <ul className="mb-3 flex-1 text-xl ">
          <NavLink icon={<HomeIcon />} title={"Home"} to={"/home"} />
          <NavLink icon={<MagnifyingGlassIcon />} title={"Explore"} />
          <NavLink icon={<BellIcon />} title={"Notifications"} />
          <NavLink icon={<EnvelopeIcon />} title={"Messages"} />
          <NavLink icon={<QueueListIcon />} title={"Lists"} />
          <NavLink icon={<BookmarkIcon />} title={"Bookmarks"} />
          <NavLink icon={<UsersIcon />} title={"Communities"} />
          <NavLink icon={<Logo />} title={"Premium"} />
          <NavLink icon={<UserIcon />} title={"Profile"} />
          <NavLink icon={<EllipsisHorizontalCircleIcon />} title={"More"} />
        </ul>

        <Button
          className="hidden bg-primary px-10 py-2 xl:block"
          title={"Post"}
        />
        <Button
          className="w-10 xl:hidden"
          icon={<img src="/post-icon.svg" />}
        />
      </div>

      <UserInfo />
    </div>
  );
};

export default SideBar;
