import { useEffect, useRef } from "react";
import { routes } from "../../../constants/routes";
import { useSidebar, useTheme } from "../../../context";
import Navlink from "../../navlink";
import ToggleThemeButton from "../../toggleThemeButton";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../language-selector";

export default function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { mode } = useTheme();
  const { t } = useTranslation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-screen bg-[#0f0e0e66] ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <div
        ref={sidebarRef}
        className="w-[80%] h-full flex flex-col justify-between px-3 py-5 bg-dark dark:bg-light overflow-y-auto"
      >
        <div className="flex flex-col gap-5 flex-1">
          <div className="flex justify-between items-center">
            <img
              src={
                mode === "dark"
                  ? "https://autochek.africa/images/logo-image.svg"
                  : "https://res.cloudinary.com/divuvb064/image/upload/v1746710080/light-logo_xyrfpa.svg"
              }
              alt="logo"
              className="w-28 md:w-36"
            />
            <ToggleThemeButton />
            <LanguageSelector />
          </div>

          <div className="mt-5 flex-1 overflow-y-auto">
            {routes.map((route, index) => (
              <Navlink
                key={index}
                icon={route.icon}
                label={t(route.label)}
                path={route.path}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
