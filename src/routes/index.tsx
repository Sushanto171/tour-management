import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Booking from "@/pages/Bookings";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import CancelPayment from "@/pages/payment/CancelPayment";
import FailedPayment from "@/pages/payment/FailedPayment";
import SuccessPayment from "@/pages/payment/SuccessPayment";
import Register from "@/pages/Register";
import TourDetails from "@/pages/TourDetails";
import Tours from "@/pages/Tours";
import UnAuthorized from "@/pages/UnAuthorized";
import Verify from "@/pages/Verify";
import { generateRoute } from "@/utils/generateRoute";
import withAuth from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: UnAuthorized,
        path: "/unauthorized",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: withAuth(Booking),
        path: "booking/:id",
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
    Component: SuccessPayment,
    path: "payment/success",
  },
  {
    Component: CancelPayment,
    path: "payment/cancel",
  },
  {
    Component: FailedPayment,
    path: "payment/fail",
  },

  {
    Component: withAuth(DashboardLayout, "SUPER_ADMIN"),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, "USER"),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoute(userSidebarItems),
    ],
  },
]);
