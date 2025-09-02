


import AdminProfilePage from "@/pages/Admin/AdminProfilePage";
import Analytics from "@/pages/Admin/Analytics";
import DriversPage from "@/pages/Admin/DriversPage";
import RidesPage from "@/pages/Admin/RidesPage";
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
    title: "Drivers",
    path: "/admin/drivers",
    icon: Car,
    items: [
      {
        title: "All Drivers",
        url: "/admin/drivers",
        component: DriversPage,
      },
    ],
  },
  {
    title: "Rides",
    path: "/admin/rides",
    icon: Car,
    items: [
      {
        title: "All Rides",
        url: "/admin/rides",
        component: RidesPage,
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
