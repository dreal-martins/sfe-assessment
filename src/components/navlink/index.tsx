import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "../../context";

interface Props {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function Navlink({ icon, label, path }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { closeSidebar } = useSidebar();
  const { pathname } = useLocation();

  const isActive =
    pathname === path ||
    pathname.startsWith(path + "/") ||
    (path === "/" && pathname.startsWith("/comments/"));

  return (
    <NavLink
      to={path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => closeSidebar()}
      className={`flex dark:text-[#667185] text-white items-center w-full p-2 gap-2 rounded-md ${
        isActive || isHovered ? "bg-[#ffb616] text-white" : "dark:t"
      }`}
    >
      {icon} {label}
    </NavLink>
  );
}
