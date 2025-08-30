import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Booking from "@/pages/user/Booking";
import Verify from "@/pages/Verify";
import { generateRoute } from "@/utils/generateRoute";
import { createBrowserRouter } from "react-router";
import { sidebarItems } from "./sidebarItems";

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
    children: [...generateRoute(sidebarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        Component: Booking,
        path: "booking",
      },
    ],
  },
]);
