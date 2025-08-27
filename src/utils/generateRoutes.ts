import { SidebarItem } from "@/types";


export const generateRoutes = (sidebarItems: SidebarItem[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};
