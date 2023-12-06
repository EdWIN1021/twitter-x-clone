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

const links = [
  {
    icon: <Logo />,
  },
  {
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    title: "Explore",
    icon: <MagnifyingGlassIcon />,
  },
  {
    title: "Notifications",
    icon: <BellIcon />,
  },
  {
    title: "Messages",
    icon: <EnvelopeIcon />,
  },
  {
    title: "Lists",
    icon: <QueueListIcon />,
  },
  {
    title: "Bookmarks",
    icon: <BookmarkIcon />,
  },
  {
    title: "Communities",
    icon: <UsersIcon />,
  },
  {
    title: "Premium",
    icon: <Logo />,
  },
  {
    title: "Profile",
    icon: <UserIcon />,
  },
  {
    title: "More",
    icon: <EllipsisHorizontalCircleIcon />,
  },
];

const SideBar = () => {
  return (
    <div className="my-5 flex flex-col xl:pr-10">
      <div className="flex flex-1 flex-col items-end">
        <ul className="text-xl">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink icon={link.icon} title={link.title} />
            </li>
          ))}
        </ul>

        <Button
          className="mt-5 w-10 self-center xl:hidden"
          icon={<img src="/post-icon.svg" />}
        />

        <Button
          className="mt-5 hidden bg-primary px-10 py-2 xl:block "
          title={"Post"}
        />
      </div>
      <UserInfo />
    </div>
  );
};

export default SideBar;
