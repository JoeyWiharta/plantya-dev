import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./routes/Index";
import AuthLayout from "./layout/AuthLayout";
import NonAuthLayout from "./layout/NonAuthLayout";
import { useAuth } from "./context/AuthContext";
import AuthMiddleware from "./routes/AuthMiddleware";

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
            <AuthMiddleware>
              <AuthLayout>{route.component}</AuthLayout>
            </AuthMiddleware>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
