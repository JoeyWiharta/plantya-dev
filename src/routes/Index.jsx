import React, { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Authmiddleware from "./Route";
import LazyLoadRoutes from "./LazyLoadRoutes";
import { DashboardRoutes, MasterDataRoutes, ReportsRoutes } from "./MenuRoutes";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import {
    LayoutDashboard,
    Layers,
    User,
    Radar,
    HouseWifi,
    ChartColumnIncreasing,
    Settings,
    Info,
    LifeBuoy
} from "lucide-react";

import {
    mdiViewDashboardOutline,
    mdiLayersTripleOutline,
    mdiAccountOutline,
    mdiHomeThermometerOutline,
    mdiAccessPointNetwork,
    mdiChartBoxOutline,
    mdiCogOutline,
    mdiFaceAgent,
    mdiInformationOutline,
} from '@mdi/js';

// // Set all Menu 
// export const appMenuStructure = [
//     {
//         path: "/dashboard",
//         component: LazyLoadRoutes(() => import("../pages/app001/Dashboard")),
//         text: "Dashboard",
//         icon: mdiViewDashboardOutline,
//         section: "main"
//     },
//     {
//         text: "Master Data",
//         icon: mdiLayersTripleOutline,
//         section: "main",
//         sub: [
//             {
//                 text: "Master User",
//                 path: "/app002/master-user",
//                 component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
//                 icon: mdiAccountOutline
//             },
//             {
//                 text: "Master Cluster",
//                 path: "/app003/master-cluster",
//                 component: LazyLoadRoutes(() => import("../pages/app003/MasterCluster")),
//                 icon: mdiHomeThermometerOutline
//             },
//             {
//                 text: "Master Device",
//                 path: "/app004/master-device",
//                 component: LazyLoadRoutes(() => import("../pages/app004/MasterDevice")),
//                 icon: mdiAccessPointNetwork
//             },
//         ],
//     },
//     {
//         text: "Reports",
//         icon: mdiChartBoxOutline,
//         section: "main",
//         sub: [
//             {
//                 text: "Table",
//                 path: "/testing",
//                 component: "",
//                 icon: mdiChartBoxOutline
//             },
//             {
//                 text: "Graph",
//                 path: "/master-data/graph",
//                 component: "",
//                 icon: mdiChartBoxOutline
//             },
//         ],
//     },
//     {
//         path: "/settings",
//         component: "",
//         text: "Settings",
//         icon: mdiCogOutline,
//         section: "main"
//     },
//     {
//         path: "/support",
//         component: "/test",
//         text: "Support",
//         icon: mdiFaceAgent,
//         section: "footer"
//     },
//     {
//         path: "/about",
//         component: "",
//         text: "About",
//         icon: mdiInformationOutline,
//         section: "footer"
//     },
// ];

// Function Route Menu
// const createRoute = (items) => {
//     let routes = []
//     items.forEach(item => {
//         if (item.path && item.component) {
//             routes.push({
//                 path: item.path,
//                 component: item.component
//             })
//         }
//         if (item.sub) {
//             routes = routes.concat(createRoute(item.sub))
//         }
//     })
//     return routes
// }

const authProtectedRoutes = [
    { path: "/", component: <Navigate to="/dashboard" replace /> },

    ...DashboardRoutes.map(route => ({
        path: route.path,
        component: route.component
    })),
    ...MasterDataRoutes.map(route => ({
        path: route.path,
        component: route.component
    })),

    ...ReportsRoutes.map(route => ({
        path: route.path,
        component: route.component
    })),
];

const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    // { path: "/logout", component: <Logout /> }
]

export { authProtectedRoutes, publicRoutes }