// import Booking from "@/pages/user/Booking";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";
const Booking = lazy(() => import("@/pages/user/Booking"));

export const userSidebarItems: ISidebarItems[] = [
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "Booking",
        url: "/user/bookings",
        component: Booking,
      },
    ],
  },
];
