import type { IRoutes } from "@/types";

export const generateRoute = (sidebarItems: IRoutes[]) => {
  return sidebarItems.flatMap((items) =>
    items.items.map((item) => ({
      path: item.url,
      component: item.component,
      title: item.component,
    }))
  );
};
