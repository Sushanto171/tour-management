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
  }),
});

export const {
  useAddTourDivisionMutation,
  useGetAllDivisionQuery,
  useGetAllTourTypesQuery,
  useAddTourTypeMutation,
  useDeleteTourTypesMutation,
} = tourApi;
