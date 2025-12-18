import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import Analytics from "@/pages/Analytics";
import { createBrowserRouter } from "react-router";


export const router= createBrowserRouter([
    {
        
        Component: App,
        path:'/',
        children:[
            {

            }
        ]
    },

      {
        
        path:'/admin',
        Component:AdminLayout,
        children:[
            {
            path:'analytics',
            Component:Analytics
        }
    ]
    }
  
])