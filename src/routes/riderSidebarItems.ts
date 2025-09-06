// import RideDetailsPage from "@/pages/Rider/RideDetailsPage";

import { ApplyAsDriver } from "@/pages/Rider/ApplyAsDriver";
import RideRequestPage from "@/pages/Rider/RideRequestPage";
import RiderHistoryPage from "@/pages/Rider/RiderHistoryPage";
import RiderProfilePage from "@/pages/Rider/RiderProfilePage";
import { SidebarItem } from "@/types";
import { Car, History, User } from "lucide-react";

// Page Components
export const riderSidebarItems: SidebarItem[] = [
  {
    title: "Ride Request",
    path: "/rider/request",
    icon: Car,
    items: [
      {
        title: "Request Ride",
        url: "/rider/request",
        component: RideRequestPage,
      },
    ],
  },
  {
    title: "Ride History",
    path: "/rider/history",
    icon: History,
    items: [
      {
        title: "History",
        url: "/rider/history",
        component: RiderHistoryPage,
      },
    ],
  },
  {
    title: "Apply Driver",
    path: "/rider/apply",
    icon: History,
    items: [
      {
        title: "Apply As Driver",
        url: "/rider/apply",
        component: ApplyAsDriver,
      },
    ],
  },
  {
    title: "Profile",
    path: "/rider/profile",
    icon: User,
    items: [
      {
        title: "My Profile",
        url: "/rider/profile",
       component:RiderProfilePage
      },
    ],
  },
];


