import AddDivision from "@/pages/admin/AddDivision";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AddTour = lazy(() => import("@/pages/admin/AddTour"));
const AddTourType = lazy(() => import("@/pages/admin/AddTourType"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
        isActive: false,
      },
    ],
  },
  {
    title: "Tour Management",
    url: "#",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
        isActive: false,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
        isActive: false,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
        isActive: false,
      },
    ],
  },
];
