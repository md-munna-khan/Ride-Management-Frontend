import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface SidebarItem {
  title: string;
  path: string;
  icon: LucideIcon;
   items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}



export type TRole =  "ADMIN"  | "RIDER" | "DRIVER";

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}
