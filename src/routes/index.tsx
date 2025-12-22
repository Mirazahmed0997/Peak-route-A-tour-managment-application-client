import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { Navigate, createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./AdminSidbarItems";
import { userSidebarItems } from "./UserSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
    ],
  },

  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
        {index:true,element: <Navigate to="/admin/analytics"/>},
        ...generateRoutes(adminSidebarItems)
    ],
  },

  {
    path: "/user",
    Component: DashboardLayout,
    children: [
        {index:true,element: <Navigate to="/user/bookings"/>},
      ...generateRoutes(userSidebarItems)
    ],
  },

  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "verify",
    Component: Verify,
  },
]);
