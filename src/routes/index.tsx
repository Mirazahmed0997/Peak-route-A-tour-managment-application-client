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
import withAuth from "@/utils/withAuth";
import unAuthorised from "@/pages/unAuthorised";
import { role } from "@/constants/Role";
import { TRole } from "@/types";

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
    Component: withAuth(DashboardLayout, role.admin as TRole),
    children: [
        {index:true,element: <Navigate to="/admin/analytics"/>},
        ...generateRoutes(adminSidebarItems)
    ],
  },

  {
    path: "/user", 
    Component: withAuth(DashboardLayout, role.user as TRole),
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
  {
    path: "unAuthorised",
    Component: unAuthorised,
  },
]);
