import React, { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Authmiddleware from "./route";
import LazyLoadRoutes from "./lazyLoadRoutes";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

const AuthProtectedRoutes = [
    { path: "/dashboard", component: LazyLoadRoutes(() => import("../pages/app001/Dashboard")) }
    // { path: "/test", component: LazyLoadRoutes(() => import("../pages/app001/Test")) }
]

const PublicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    { path: "/logout", component: <Logout /> }
]

export { AuthProtectedRoutes, PublicRoutes }