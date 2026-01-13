// src/routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";

import RequireAuth from "./auth/RequireAuth";
import DashboardLayout from "./layouts/DashboardLayout";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "patients", element: <Patients /> },
    ],
  },
]);
