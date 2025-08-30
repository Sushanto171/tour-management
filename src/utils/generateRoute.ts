import type { ISidebarItems } from "@/types";

export const generateRoute = (adminSidebarItems: ISidebarItems[]) => {
  return adminSidebarItems.flatMap((items) =>
    items.items.map((item) => ({
      Component: item.component,
      title: item.component,
      path: item.url,
    }))
  );
};
