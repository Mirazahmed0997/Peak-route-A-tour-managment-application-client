import App from "@/App";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";

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
    }



])