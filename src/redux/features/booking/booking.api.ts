import { baseApi } from "@/redux/baseApi";


export const booikingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/Booking/create',
        method: "POST",
        body: bookingData
      }),
      invalidatesTags:["BOOKING"]
    }),

    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/Booking/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags:["BOOKING"]
    }),
  
   
    UserBookings: builder.query({
      query: () => ({
        url: "Booking/my-bookings",
        method: "GET",
      }),
      providesTags:["BOOKING"],
      transformResponse:(res)=> res.data.data
    }),

  })
})

export const { 
    useUserBookingsQuery,
    useCreateBookingMutation,
    useDeleteBookingMutation
} = booikingApi