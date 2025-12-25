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
import HomePage from "@/pages/Home/HomePage";
import TourDetails from "@/pages/Tours/TourDetails";
import AllTours from "@/pages/Tours/AllTous";
import Bookings from "@/pages/User/Bookings";
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import Cancel from "@/pages/Payment/Cancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      
      {
        path: "about",
        Component: About,
      },
      {
        path: "tour",
        Component: AllTours,
      },
      {
        path: "tour/:id",
        Component: TourDetails,
      },
      {
        path: "booking/:id",
        Component: withAuth(Bookings),
      },
    ],
  },

  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole ),
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
  {
    path: "payment/success",
    Component: Success,
  },
  {
    path: "payment/fail",
    Component: Fail,
  },
  {
    path: "payment/cancel",
    Component: Cancel,
  },
]);
