import { baseApi } from "@/redux/baseApi";


export const divisonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    createDivision: builder.mutation({
      query: (tourTypeInfo) => ({
        url: '/division/create',
        method: "POST",
        body: tourTypeInfo
      }),
      invalidatesTags:["DIVISION"]
    }),

    deleteDivision: builder.mutation({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags:["DIVISION"]
    }),
  
   
    divisions: builder.query({
      query: (divisionId) => ({
        url: "/division",
        method: "GET",
        params:divisionId
      }),
      providesTags:["DIVISION"],
      transformResponse:(res)=> res.data.data
    }),

  })
})

export const { 
    useCreateDivisionMutation,
    useDivisionsQuery,
    useDeleteDivisionMutation
} = divisonApi