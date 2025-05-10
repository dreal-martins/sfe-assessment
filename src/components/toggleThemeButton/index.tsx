import { MoonIcon } from "../../assets/icons/moonIcon";
import { SunIcon } from "../../assets/icons/sunIcon";
import { useTheme } from "../../context";
import CustomIcon from "../custom-icon";

const ToggleThemeButton = () => {
  const { mode, setMode } = useTheme();

  return (
    <button
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      className={`w-10 h-10 flex items-center justify-center rounded-full ${
        mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {mode === "dark" ? (
        <CustomIcon SvgIcon={SunIcon} size={22} className="w-6 h-6 fill-dark" />
      ) : (
        <CustomIcon
          SvgIcon={MoonIcon}
          size={22}
          className="w-6 h-6 fill-dark"
        />
      )}
    </button>
  );
};

export default ToggleThemeButton;
