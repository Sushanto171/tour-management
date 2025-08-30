import Booking from "@/pages/user/Booking";
import type { ISidebarItems } from "@/types";

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
