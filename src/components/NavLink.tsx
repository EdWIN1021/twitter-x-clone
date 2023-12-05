import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  icon: React.ReactNode;
  title?: string;
  to?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, title, to = "/home" }) => {
  return (
    <li className="py-1">
      <Link
        className="cursor-pointer justify-center md:flex md:justify-start"
        to={to}
      >
        <div className="flex rounded-full px-4 py-2 hover:bg-hover-gray">
          <div className={`w-7 ${title && "mx-3"} `}>{icon}</div>
          <span className="hidden min-[1440px]:block"> {title}</span>
        </div>
      </Link>
    </li>
  );
};

export default NavLink;
