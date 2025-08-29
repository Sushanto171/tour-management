export type { IMe, ISendOtp, IVerifyOtp, Login, Register } from "./auth.types";

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
