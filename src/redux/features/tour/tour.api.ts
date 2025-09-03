import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ITourPackage } from "@/types/tour.type";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR_TYPE"],
    }),
    getAllTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR_TYPE"],
      transformResponse: (response) => response.data,
    }),
    deleteTourTypes: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR_TYPE"],
      transformResponse: (response) => response.data,
    }),
    getAllTours: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    deleteTour: builder.mutation({
      query: (params) => ({
        url: `/tour/${params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const {
  useGetAllTourTypesQuery,
  useAddTourTypeMutation,
  useDeleteTourTypesMutation,
  useGetAllToursQuery,
  useAddTourMutation,
  useDeleteTourMutation,
} = tourApi;
