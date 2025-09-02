


import AdminProfilePage from "@/pages/Admin/AdminProfilePage";
import Analytics from "@/pages/Admin/Analytics";
import { RidesManagement } from "@/pages/Admin/RidesManagement";


import UserManagement from "@/pages/Admin/UserManagement";

import { SidebarItem } from "@/types";
import { Users, Car, BarChart3, UserCog } from "lucide-react";

// Page Components


export const adminSidebarItems: SidebarItem[] = [
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: Users,
    items: [
      {
        title: "All Users",
        url: "/admin/users",
        component: UserManagement,
      },
    ],
  },
  {
    title: "Rides Management",
    path: "/admin/rides",
    icon: Car,
    items: [
      {
        title: "Rides Management",
        url: "/admin/rides",
        component: RidesManagement,
      },
    ],
  },
  {
    title: "Profile",
    path: "/admin/profile",
    icon: UserCog,
    items: [
      {
        title: "Admin Profile",
        url: "/admin/profile",
        component: AdminProfilePage,
      },
    ],
  },
];
