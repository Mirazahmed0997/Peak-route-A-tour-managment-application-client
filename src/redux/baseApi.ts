import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import axiosBaseQuery from "./AxiosBaseQuery"


export const baseApi=createApi({
    reducerPath:"baseApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/v1", credentials:"include"}),
    // baseQuery: axiosBaseQuery(),
    tagTypes:["USER","TOUR","DIVISION","BOOKING"],
    endpoints: ()=>({}),
})