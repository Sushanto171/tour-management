import type { ISidebarItems } from "@/types";

export const generateRoute = (adminRouteItems: ISidebarItems[]) => {
  return adminRouteItems.flatMap((items) =>
    items.items.map((item) => ({
      Component: item.component,
      title: item.component,
      path: item.url,
    }))
  );
};
