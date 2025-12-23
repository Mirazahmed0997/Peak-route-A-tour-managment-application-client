import AddTour from "@/pages/Admin/ToursTable";
import AddTourType from "@/pages/Admin/AddTourType";
import { ISidebarItem } from "@/types";
import { lazy } from "react";
import DivisionTable from "@/pages/Admin/DivisionTable";


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
            url: "/admin/tourTable",
            component:AddTour
          },       
          {
            title: "Tour Type Managment",
            url: "/admin/tourTypeTable",
            component:AddTourType
          },       
          {
            title: "Division Managment",
            url: "/admin/divisionTable",
            component:DivisionTable
          },       
        ],
      },
]