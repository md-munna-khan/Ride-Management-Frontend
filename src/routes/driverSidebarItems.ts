
import ActiveRides from "@/pages/Driver/ActiveRides";
import Earnings from "@/pages/Driver/Earnings";
import Profile from "@/pages/Driver/DriverProfile";
import RideHistory from "@/pages/Driver/RideHistory";
import { SidebarItem } from "@/types";
import { Car, CreditCard, History, User } from "lucide-react";

// Page Components


export const driverSidebarItems: SidebarItem[] = [
  {
    title: "Active Rides",
    path: "/driver/rides",
    icon: Car,
    items: [
      {
        title: "Active Rides",
        url: "/driver/rides",
        component: ActiveRides,
      },
    ],
  },
  {
    title: "Ride History",
    path: "/driver/history",
    icon: History,
    items: [
      {
        title: "Ride History",
        url: "/driver/history",
        component: RideHistory,
      },
    ],
  },
  
  {
    title: "Earnings",
    path: "/driver/earnings",
    icon: CreditCard,
    items: [
      {
        title: "My Earnings",
        url: "/driver/earnings",
        component: Earnings,
      },
    ],
  },
  {
    title: "Profile",
    path: "/driver/profile",
    icon: User,
    items: [
      {
        title: "Driver Profile",
        url: "/driver/profile",
        component: Profile,
      },
    ],
  },
];
