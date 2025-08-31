import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourDivision: builder.mutation({
      query: (tourDivisionName) => ({
        url: "division/create",
        method: "POST",
        data: tourDivisionName,
      }),
    }),
    getAllDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getAllTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useAddTourDivisionMutation,
  useGetAllDivisionQuery,
  useGetAllTourTypesQuery,
} = tourApi;
