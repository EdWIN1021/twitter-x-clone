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

const SideNav = () => {
  return (
    <div className="flex flex-col w-[275px] mt-2 mb-5">
      <ul className=" border-r text-xl flex-1">
        <NavLink icon={<Logo />} />
        <NavLink icon={<HomeIcon />} title={"Home"} to={"/home"} />
        <NavLink
          icon={<MagnifyingGlassIcon />}
          title={"Explore"}
          to={"/explore"}
        />
        <NavLink icon={<BellIcon />} title={"Notifications"} />
        <NavLink icon={<EnvelopeIcon />} title={"Messages"} />
        <NavLink icon={<QueueListIcon />} title={"Lists"} />
        <NavLink icon={<BookmarkIcon />} title={"Bookmarks"} />
        <NavLink icon={<UsersIcon />} title={"Communities"} />
        <NavLink icon={<Logo />} title={"Premium"} />
        <NavLink icon={<UserIcon />} title={"Profile"} />
        <NavLink icon={<EllipsisHorizontalCircleIcon />} title={"More"} />

        <div className="w-[244px]">
          <Button title={"Post"} />
        </div>
      </ul>

      <UserInfo />
    </div>
  );
};

export default SideNav;
