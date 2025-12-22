import AddTour from "@/pages/Admin/AddTour";
import Analitics from "@/pages/Admin/Analitics";
import { ISidebarItem } from "@/types";


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