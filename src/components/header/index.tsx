import CustomIcon from "../custom-icon";
import { getCurrentDateTime } from "../../utils";
import { useEffect, useState } from "react";
import MobileSidebar from "../sidebar/mobile";
import LanguageSelector from "../language-selector";
import ToggleThemeButton from "../toggleThemeButton";
import { useSidebar, useTheme } from "../../context";
import i18n from "../../i18n";
import { MenuIcon } from "../../assets/icons/menuIcon";

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(() =>
    getCurrentDateTime(i18n.language)
  );
  const { toggleSidebar } = useSidebar();
  const { mode } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime(i18n.language));
    }, 1000);

    return () => clearInterval(interval);
  }, [i18n.language]);

  return (
    <div className="p-4 flex justify-between items-center dark:border-b dark:border-[#DFDFDF] bg-dark dark:bg-light">
      <img
        src={
          mode === "dark"
            ? "https://autochek.africa/images/logo-image.svg"
            : "https://res.cloudinary.com/divuvb064/image/upload/v1746710080/light-logo_xyrfpa.svg"
        }
        alt="logo"
        className="w-28 md:w-36"
      />

      <div onClick={toggleSidebar} className="md:hidden">
        <CustomIcon
          SvgIcon={MenuIcon}
          size={25}
          className={mode === "dark" ? "#1A1A1A" : "#F4F4F4"}
        />
      </div>
      <MobileSidebar />

      {/* Desktop Header */}
      <div className="hidden md:flex items-center">
        <div className="flex justify-start items-center gap-3 mr-3">
          <h1 className="dark:text-[#667185] text-white text-base">
            {currentDateTime}
          </h1>

          <span className="text-lg dark:text-[#667185] text-white ">|</span>

          <LanguageSelector />

          <span className="text-lg dark:text-[#667185] text-white ">|</span>

          <ToggleThemeButton />
        </div>

        <img
          src="https://i.pinimg.com/736x/ed/52/d5/ed52d55f76b515dea60f1005fbb09f6f.jpg"
          width={45}
          height={45}
          alt="profile"
          className="w-14 h-14 rounded-full object-cover cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
