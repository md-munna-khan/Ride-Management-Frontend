


import AdminProfilePage from "@/pages/Admin/AdminProfilePage";
import Analytics from "@/pages/Admin/Analytics";
import DriverManagement from "@/pages/Admin/DriverManagement";
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
    title: "User Management",
    path: "/admin/users",
    icon: Users,
    items: [
      {
        title: "User Management",
        url: "/admin/users",
        component: UserManagement,
      },
    ],
  },
  {
    title: "Driver Management",
    path: "/admin/drivers",
    icon: Users,
    items: [
      {
        title: "Driver Management",
        url: "/admin/drivers",
        component: DriverManagement,
      },
    ],
  },
  {
    title: "Rides Oversight",
    path: "/admin/rides",
    icon: Car,
    items: [
      {
        title: "Rides Oversight",
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



