import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProtectedRoute from "../components/layout/protect/ProtectedRoute";
import Index from "../page/auth/login";
import Dashboard from "../page/dash";
import { Registration } from "../page/auth/registration";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
