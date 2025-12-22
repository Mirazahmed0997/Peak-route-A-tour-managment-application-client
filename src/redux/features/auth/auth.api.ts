import { baseApi } from "@/redux/baseApi";
import { IResponse, IsendOtp, IverifyOtp } from "@/types";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/user/register',
        method: "POST",
        body: userInfo
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: "POST",
        body: userInfo
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/log-out',
        method: "POST",
      }),
      invalidatesTags:["USER"]
    }),
    sendOtp: builder.mutation<IResponse<null>, IsendOtp>({
      query: (userInfo) => ({
        url: "/Otp/send",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IverifyOtp>({
      query: (userInfo) => ({
        url: "/Otp/verify",
        method: "POST",
        body: userInfo,
      }),
    }),



    userProfile: builder.query({
      query: () => ({
        url: "/user/userProfile",
        method: "GET",
      }),
      providesTags:["USER"]
    }),


  })
})

export const { useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserProfileQuery,
  useLogoutMutation
} = authApi