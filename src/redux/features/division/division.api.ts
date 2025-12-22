import { baseApi } from "@/redux/baseApi";


export const divisonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    createDivision: builder.mutation({
      query: (tourTypeInfo) => ({
        url: '/division/create',
        method: "POST",
        body: tourTypeInfo
      }),
    }),
  
   
    divisions: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse:(res)=> res.data.data
    }),


  })
})

export const { 
    useCreateDivisionMutation,
    useDivisionsQuery
} = divisonApi