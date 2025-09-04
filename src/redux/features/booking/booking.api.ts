import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetAllBookingQuery } = bookingApi;
