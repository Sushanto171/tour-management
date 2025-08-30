import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoute } from "@/utils/generateRoute";
import { createBrowserRouter } from "react-router";
import { adminRouteItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoute(adminRouteItems)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [...generateRoute(userSidebarItems)],
  },
]);
