import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import AddTourType from "@/pages/admin/AddTourType";
import Analytics from "@/pages/admin/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Booking from "@/pages/user/Booking";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

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
    children: [
      {
        Component: Analytics,
        path: "analytics",
      },
      {
        Component: AddTourType,
        path: "add-tour-type",
      },
    ],
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
