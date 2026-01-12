

import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/home/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import { TRole } from "@/types";
import Homepage from "@/pages/home/Homepage";



// import RideDetails from "@/pages/RideDetails";
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import Features from "@/pages/home/Features";
import Contact from "@/pages/home/Contact";
import FAQ from "@/pages/home/FAQ";
import AccountStatus from "@/pages/AccountStatus";
import { riderSidebarItems } from "./riderSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import RideDetailsPage from "@/pages/Rider/RideDetailsPage";


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
   
     
    ],
  },

  // Admin Dashboard
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  // Rider Dashboard
  {
    Component: withAuth(DashboardLayout, role.rider as TRole),
    path: "/rider",
    children: [
      { index: true, element: <Navigate to="/rider/request" /> },
      ...generateRoutes(riderSidebarItems),
    ],
  },

  // Driver Dashboard
  {
    Component: withAuth(DashboardLayout, role.driver as TRole),
    path: "/driver",
    children: [
      { index: true, element: <Navigate to="/driver/rides" /> },
      ...generateRoutes(driverSidebarItems),
    ],
  },

  // Auth Pages
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },

  // Others
   {
    Component: RideDetailsPage,
    path: "/rides/:rideId",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  
  {
    Component: Success,
    path: "/payment/success",
  },
  {
    Component: Fail,
    path: "/payment/fail",
  },
  {
    Component:AccountStatus ,
    path: "/status",
  },
]);
