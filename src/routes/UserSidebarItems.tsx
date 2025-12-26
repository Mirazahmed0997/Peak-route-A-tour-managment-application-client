
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const BookingTable =lazy(()=>import("@/components/modules/User/BookingTable"))



export const userSidebarItems : ISidebarItem[]=[
    {
        title: "History",
        items: [
          {
            title: "Bookings",
            url: "/user/bookings",
            component: BookingTable
          },       
        ],
      },

      {
        title: "Managment",
        items: [
          {
            title: "All Bookings",
            url: "/user/bookings",
            component:BookingTable
          },       
             
                
        ],
      },
    
]