import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    //////////Tour Type API///////////

    createTourType: builder.mutation({
      query: (tourTypeInfo) => ({
        url: '/TourType/create',
        method: "POST",
        body: tourTypeInfo
      }),
      invalidatesTags: ["TOUR"]
    }),

    tourTypes: builder.query({
      query: (params) => ({
        url: "/TourType",
        method: "GET",
        params:params
      }),
      transformResponse: (res) => res.data,
      providesTags: ["TOUR"]
    }),

    removeTourTypes: builder.mutation({
      query: (tourTypeId) => ({
        url: `/TourType/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"]
    }),



/////////////Tours API////////////////

    createTour: builder.mutation({
      query: (tourInfo) => ({
        url: '/Tour/create',
        method: "POST",
        body: tourInfo
      }),
      invalidatesTags: ["TOUR"]
    }),

    removeTour: builder.mutation({
      query: (tourId) => ({
        url: `/Tour/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"]
    }),

    tours: builder.query({
      query: (tourId) => ({
        url: "/Tour",
        method: "GET",
        params:tourId
      }),
      transformResponse: (res) => res.data,
      providesTags: ["TOUR"]
    }),

    


  })
})

export const {
  useCreateTourTypeMutation,
  useCreateTourMutation,
  useToursQuery,
  useTourTypesQuery,
  useRemoveTourTypesMutation,
  useRemoveTourMutation,
} = tourApi