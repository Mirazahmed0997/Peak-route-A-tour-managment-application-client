import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    createTourType: builder.mutation({
      query: (tourTypeInfo) => ({
        url: '/TourType/create',
        method: "POST",
        body: tourTypeInfo
      }),
      invalidatesTags:["TOUR"]
    }),
    createTour: builder.mutation({
      query: (tourInfo) => ({
        url: '/Tour/create',
        method: "POST",
        body: tourInfo
      }),
      invalidatesTags:["TOUR"]
    }),
    tourTypes: builder.query({
      query: () => ({
        url: "/TourType",
        method: "GET",
      }),
      transformResponse:(res)=> res.data.data,
      providesTags:["TOUR"]
    }),
    tours: builder.query({
      query: () => ({
        url: "/Tour",
        method: "GET",
      }),
      transformResponse:(res)=> res.data.data,
      providesTags:["TOUR"]
    }),


  })
})

export const { 
useCreateTourTypeMutation,
useCreateTourMutation,
useToursQuery,
useTourTypesQuery
} = tourApi