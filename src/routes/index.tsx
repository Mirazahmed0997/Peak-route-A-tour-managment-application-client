import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/User/Bookings";
import Verify from "@/pages/verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./AdminSidbarItems";

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
        ...generateRoutes(adminSidebarItems)
    ],
  },

  {
    path: "/user",
    Component: DashboardLayout,
    children: [
      {
        path: "bookings",   
        Component: Bookings,
      },
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
