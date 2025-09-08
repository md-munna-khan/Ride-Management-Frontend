/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    console.log(data)
   const user = data?.data;
   console.log(user)
   
    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }
       if (!isLoading && (user?.status === "BLOCKED" || user?.status === "Suspended")) {
      return (
        <Navigate
          to="/login"
          state={{ status: user?.status }}
        />
      );
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};

