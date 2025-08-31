import { baseApi } from "@/redux/baseApi";
import type {
  IMe,
  IResponse,
  ISendOtp,
  IVerifyOtp,
  Login,
  Register,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
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
    logout: builder.mutation<IResponse<null>, null>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    userInfo: builder.query<IResponse<IMe>, unknown>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
