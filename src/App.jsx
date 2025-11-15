import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { AuthProtectedRoutes, PublicRoutes } from "./routes/Index";
import Authmiddleware from "./routes/route";
import AuthLayout from "./layout/AuthLayout";
import NonAuthLayout from "./layout/NonAuthLayout";

const App = () => {
  debugger
  const token = ReactSession.get("authUser");


  return (
    <Routes>
      <Route
        path="/"
        element={
          token?.token ? (
            <Navigate to="/test" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {PublicRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<NonAuthLayout>{route.component}</NonAuthLayout>}
        />
      ))}

      {AuthProtectedRoutes.map((route, idx) => (
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
