import type { ComponentType } from "react";

export type { IMe, ISendOtp, IVerifyOtp, Login, Register } from "./auth.types";

export interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}

export interface ISidebarItems {
  title: string;
  url: string;
  items: {
    component: ComponentType;
    title: string;
    url: string;
    isActive: boolean;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface IDivision {
  name: string;
  description: string;
  file: File;
}

export interface ITour {
  title: string;
  division: string;
  tourType: string;
  description?: string;
  images?: string[];
  location: string;
  costFrom: number;
  startDate: Date;
  endDate: Date;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  departureLocation: string;
  arrivalLocation: string;
  deleteImages?: string[];
}
