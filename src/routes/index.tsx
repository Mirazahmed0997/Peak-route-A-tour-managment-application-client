import App from "@/App";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import verify from "@/pages/verify";

import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {

        Component: App,
        path: '/',
        children: [
            {
                Component: Analytics,
                path: 'analytics',
            },
            {
                Component: About,
                path: 'about',
            },

        ]
    },

    {
        Component: Login,
        path: 'login',
    },
    {
        Component: Register,
        path: 'register',
    },
    {
        Component: verify,
        path: 'verify',
    },



])