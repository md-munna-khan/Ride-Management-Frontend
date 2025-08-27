import ActiveRidesPage from "@/pages/Driver/ActiveRidesPage";
import DriverProfilePage from "@/pages/Driver/DriverProfilePage";
import EarningsPage from "@/pages/Driver/EarningsPage";
import RideHistoryPage from "@/pages/Driver/RideHistoryPage";
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
        title: "All Rides",
        url: "/driver/rides",
        component: ActiveRidesPage,
      },
    ],
  },
  {
    title: "Ride History",
    path: "/driver/history",
    icon: History,
    items: [
      {
        title: "History",
        url: "/driver/history",
        component: RideHistoryPage,
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
        component: EarningsPage,
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
        component: DriverProfilePage,
      },
    ],
  },
];
