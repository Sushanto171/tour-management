import type { ISidebarItems } from "@/types";

export const generateRoute = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((items) =>
    items.items.map((item) => ({
      Component: item.component,
      title: item.component,
      path: item.url,
    }))
  );
};
