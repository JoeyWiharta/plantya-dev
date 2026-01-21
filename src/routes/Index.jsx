import { Navigate } from 'react-router-dom';
import MenuRoutes from './MenuRoutes';
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

const mappingMenuRoutes = (items) => items.flatMap(item => {
    if (item.sub) {
        return mappingMenuRoutes(item.sub)
    } else {
        return item.component ? [{
            path: item.path,
            component: item.component
        }] : []
    }
})

const authProtectedRoutes = [
    { path: "/", component: <Navigate to="/app001/dashboard" replace /> },
    ...mappingMenuRoutes(MenuRoutes)
];

const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
]

export { authProtectedRoutes, publicRoutes }