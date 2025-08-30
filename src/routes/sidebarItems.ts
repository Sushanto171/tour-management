import AddTourType from "@/pages/admin/AddTourType";
import Analytics from "@/pages/admin/Analytics";
import type { IRoutes } from "@/types";

export const sidebarItems: IRoutes[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    url: "#",
    items: [
      {
        title: "Add-Tour-Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
    ],
  },
];
