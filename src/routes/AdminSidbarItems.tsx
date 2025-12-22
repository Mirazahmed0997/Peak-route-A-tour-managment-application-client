import AddTour from "@/pages/Admin/AddTour";
import { ISidebarItem } from "@/types";
import { lazy } from "react";


const Analitics =lazy(()=>import("@/pages/Admin/Analitics"))

export const adminSidebarItems : ISidebarItem[]=[
    {
        title: "Dashboard",
        items: [
          {
            title: "Analytics",
            url: "/admin/analytics",
            component: Analitics
          },       
        ],
      },
    
      {
        title: "Tour Managment",
        items: [
          {
            title: "Add Tour",
            url: "/admin/add-tour",
            component:AddTour
          },       
        ],
      },
]