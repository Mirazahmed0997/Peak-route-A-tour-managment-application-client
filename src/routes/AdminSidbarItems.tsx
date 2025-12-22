import AddDivision from "@/pages/Admin/AddDivision";
import AddTour from "@/pages/Admin/ToursTable";
import AddTourType from "@/pages/Admin/AddTourType";
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
        title: "Managment",
        items: [
          {
            title: "Tour Managment",
            url: "/admin/add-tour",
            component:AddTour
          },       
          {
            title: "Tour Type Managment",
            url: "/admin/add-tourType",
            component:AddTourType
          },       
          {
            title: "Division Managment",
            url: "/admin/add-division",
            component:AddDivision
          },       
        ],
      },
]