import { useTranslation } from "react-i18next";
import { routes } from "../../../constants/routes";
import Navlink from "../../navlink";

export default function DesktopSidebar() {
  const { t } = useTranslation();

  return (
    <div className="h-full w-[17%] pl-4 pt-4 pr-2 bg-dark dark:bg-light">
      <div className="flex flex-col gap-2">
        {routes.map((route, i) => (
          <Navlink
            key={i}
            icon={route.icon}
            label={t(route.label)}
            path={route.path}
          />
        ))}
      </div>
    </div>
  );
}
