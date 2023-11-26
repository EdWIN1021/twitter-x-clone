import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  icon: React.ReactNode;
  title?: string;
  to?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, title, to = "/home" }) => {
  return (
    <li className="w-[244px]">
      <Link className="flex items-center gap-3 p-3 cursor-pointer" to={to}>
        <div className="w-7">{icon}</div>
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default NavLink;
