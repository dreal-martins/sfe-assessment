import { IRoutes } from "../interfaces/routes";
import { LiaComment } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";

export const routes: IRoutes[] = [
  {
    label: "routes.comments",
    path: "/",
    icon: <LiaComment />,
  },
  {
    label: "routes.users",
    path: "/users",
    icon: <FaRegUser />,
  },
];
