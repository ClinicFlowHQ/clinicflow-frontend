// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import PatientVisits from "./pages/PatientVisits";
import VisitDetail from "./pages/VisitDetail";
import Visits from "./pages/Visits";
import Prescriptions from "./pages/Prescriptions";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  const { i18n } = useTranslation();

  // Sync document language with i18n for proper date/time input formatting
  // Using "en-GB" for English ensures 24-hour format and DD/MM/YYYY
  useEffect(() => {
    const lang = i18n.language?.startsWith("fr") ? "fr-FR" : "en-GB";
    document.documentElement.lang = lang;
  }, [i18n.language]);

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Patients */}
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/patients/:id/visits" element={<PatientVisits />} />
        <Route path="/patients/:id/visits/:visitId" element={<VisitDetail />} />

        {/* Visits */}
        <Route path="/visits" element={<Visits />} />

        {/* Prescriptions */}
        <Route path="/prescriptions" element={<Prescriptions />} />

        {/* Appointments */}
        <Route path="/appointments" element={<Appointments />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
