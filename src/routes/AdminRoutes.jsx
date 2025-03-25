import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Login from '../pages/admin/Login'
import NotFound from "../pages/common/NotFound";
import Dashboard from "../pages/admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound role='admin' />} />
    </Routes>
  );
};

export default AdminRoutes;
