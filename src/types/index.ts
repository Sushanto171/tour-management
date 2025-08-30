import type { ComponentType } from "react";

export type { IMe, ISendOtp, IVerifyOtp, Login, Register } from "./auth.types";

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItems {
  title: string;
  url: string;
  items: {
    component: ComponentType;
    title: string;
    url: string;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";
