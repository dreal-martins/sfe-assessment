import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
}

export default function MobileLayout({ name }: Props) {
  const { t } = useTranslation();
  return (
    <div className="h-full w-full flex flex-col">
      <Header />

      <div className="px-4 bg-[#1A1A1A] dark:bg-[#FEFEFE] overflow-y-scroll pt-4 pb-10">
        <h1 className=" bg-[#1A1A1A] dark:bg-[#FEFEFE] dark:text-[#667185] text-white text-lg text-center font-semibold pt-2 pb-4">
          {t("welcome")} {name} 👋😊
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
