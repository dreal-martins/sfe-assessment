import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import DesktopSidebar from "../../components/sidebar/desktop";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
}

export default function Desktop({ name }: Props) {
  const { t } = useTranslation();
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar />

        <div className="flex-1 overflow-auto px-12 py-4 bg-[#1A1A1A] dark:bg-[#FEFEFE]">
          <h1 className="text-left  dark:text-[#667185] text-white text-2xl font-semibold pt-2 pb-4">
            {t("welcome")} {name} 👋😊
          </h1>
          <div className="flex-1 overflow-auto bg-[#1A1A1A] dark:bg-[#FEFEFE]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
