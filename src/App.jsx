import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./routes/Index";
import Authmiddleware from "./routes/Route";
import AuthLayout from "./layout/AuthLayout";
import NonAuthLayout from "./layout/NonAuthLayout";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { loginStatus } = useAuth();


  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<NonAuthLayout>{route.component}</NonAuthLayout>}
        />
      ))}

      {authProtectedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <Authmiddleware>
              <AuthLayout>{route.component}</AuthLayout>
            </Authmiddleware>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
