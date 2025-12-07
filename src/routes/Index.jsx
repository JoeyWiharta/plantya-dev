import React, { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Authmiddleware from "./route";
import LazyLoadRoutes from "./lazyLoadRoutes";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Set all Menu 
export const appMenuStructure = [
    {
        path: "/dashboard",
        component: LazyLoadRoutes(() => import("../pages/app001/Dashboard")),
        text: "Dashboard",
        icon: <DashboardCustomizeIcon />,
        section: "main"
    },
    {
        text: "Master Data",
        icon: <PeopleIcon />,
        section: "main",
        sub: [
            {
                text: "Master User",
                path: "/master/user",
                component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
                icon: <PersonIcon />
            },
            {
                text: "Master Device",
                path: "/master/device",
                component: LazyLoadRoutes(() => import("../pages/app003/MasterDevice")),
                icon: <GroupIcon />
            },
        ],
    },
    {
        text: "Reports",
        icon: <AnalyticsOutlinedIcon />,
        section: "main",
        sub: [
            {
                text: "Table",
                path: "/testing",
                component: "",
                icon: <BackupTableOutlinedIcon />
            },
            {
                text: "Graph",
                path: "/master-data/graph",
                component: "",
                icon: <ShowChartOutlinedIcon />
            },
        ],
    },
    {
        text: "Header Test",
        icon: <FactCheckOutlinedIcon />,
        section: "main",
        sub: [
            {
                text: "Test 1",
                path: "/test",
                component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
                icon: <PersonIcon />
            },

            {
                text: "Test 2",
                path: "/master-data/team",
                component: "",
                icon: <PersonIcon />
            },
            {
                text: "Test 3",
                path: "/test",
                component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
                icon: <PersonIcon />
            },
            {
                text: "Test 4",
                path: "/test",
                component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
                icon: <PersonIcon />
            },
            {
                text: "Test 5",
                path: "/test",
                component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
                icon: <PersonIcon />
            },
        ],
    },
    {
        path: "/settings",
        component: "",
        text: "Settings",
        icon: <SettingsIcon />,
        section: "main"
    },
    {
        path: "/support",
        component: "/test",
        text: "Support",
        icon: <SupportAgentOutlinedIcon />,
        section: "footer"
    },
    {
        path: "/about",
        component: "",
        text: "About",
        icon: <InfoOutlinedIcon />,
        section: "footer"
    },
];

// Function Route Menu
const createRoute = (items) => {
    let routes = []
    items.forEach(item => {
        if (item.path && item.component) {
            routes.push({
                path: item.path,
                component: item.component
            })
        }
        if (item.sub) {
            routes = routes.concat(createRoute(item.sub))
        }
    })
    return routes
}

const AuthProtectedRoutes = createRoute(appMenuStructure)
const PublicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    { path: "/logout", component: <Logout /> }
]

export { AuthProtectedRoutes, PublicRoutes }