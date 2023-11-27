import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  icon: React.ReactNode;
  title?: string;
  to?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, title, to = "/home" }) => {
  return (
    <li className="w-[244px] py-1">
      <Link className="cursor-pointer flex" to={to}>
        <div className="flex hover:bg-hover-gray p-2 rounded-full">
          <div className={`w-7 ${title && "mr-3"} `}>{icon}</div>
          <span>{title}</span>
        </div>
      </Link>
    </li>
  );
};

export default NavLink;
