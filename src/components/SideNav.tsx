import Button from "./Button";
import Logo from "./Logo";
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

const SideNav = () => {
  return (
    <ul className="max-w-[259px] border-r text-xl ">
      <li className="p-4">
        <Logo />
      </li>
      <li className="flex items-center gap-3 p-3">
        <HomeIcon className="w-7" />
        <span>Home</span>
      </li>
      <li className="flex items-center gap-3 p-3">
        <MagnifyingGlassIcon className="w-7" />
        <span>Explore</span>
      </li>
      <li className="flex items-center gap-3 p-3">
        <BellIcon className="w-7" />
        <span>Notifications</span>
      </li>
      <li className="flex items-center gap-3 p-3">
        <EnvelopeIcon className="w-7" />
        <span>Messages</span>
      </li>
      <li className="flex items-center gap-3 p-3">
        <QueueListIcon className="w-7" />
        <span>Lists</span>
      </li>
      <li className="flex items-center gap-3 p-3">
        <BookmarkIcon className="w-7" />
        <span>Bookmarks</span>
      </li>
      <li className="flex items-center gap-3 p-3">
        <UsersIcon className="w-7" />
        <span>Communities</span>
      </li>

      <li className="flex items-center gap-3 p-3">
        <Logo />
        <span>Premium</span>
      </li>

      <li className="flex items-center gap-3 p-3">
        <UserIcon className="w-7" />
        <span>Profile</span>
      </li>
      <li className="flex items-center gap-3 p-3">
        <EllipsisHorizontalCircleIcon className="w-7" />
        <span>More</span>
      </li>

      <Button title={"Post"} />
    </ul>
  );
};

export default SideNav;
