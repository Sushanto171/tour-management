import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp, Login, Register } from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<null>, Login>({
      query: (userInfo) => ({
        url: "/auth/login",
        data: userInfo,
        method: "POST",
      }),
    }),
    register: builder.mutation<IResponse<null>, Register>({
      query: (userInfo) => ({
        url: "/user/register",
        data: userInfo,
        method: "POST",
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
