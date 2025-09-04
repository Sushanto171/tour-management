import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IDivision } from "@/types/division.type";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivision: builder.query<IResponse<IDivision[]>, unknown>({
      query: (params) => ({
        url: "/division",
        method: "GET",
        params,
      }),
      providesTags: ["DIVISION", "TOUR"],
      // transformResponse: (response) => response.data,
    }),
    addTourDivision: builder.mutation({
      query: (divisionData) => ({
        url: "division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    deleteTourDivision: builder.mutation({
      query: (divisionId) => ({
        url: `division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const {
  useAddTourDivisionMutation,
  useGetAllDivisionQuery,
  useDeleteTourDivisionMutation,
} = divisionApi;
