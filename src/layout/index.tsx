import { useScreenSize } from "../hooks";
import Desktop from "./desktop";
import { default as Mobile, default as MobileLayout } from "./mobile";

export default function Layout() {
  const { isMobile, isDesktop } = useScreenSize();

  let name = localStorage.getItem("userName");

  if (!name) {
    name = prompt("What's your name?");
    if (name) {
      localStorage.setItem("userName", name);
    }
  }

  let layoutContent;

  switch (true) {
    case isMobile:
      layoutContent = <MobileLayout name={name || "User"} />;

      break;
    case isDesktop:
      layoutContent = <Desktop name={name || "User"} />;
      break;

    default:
      layoutContent = <Mobile name={name || "User"} />;
      break;
  }

  return layoutContent;
}
