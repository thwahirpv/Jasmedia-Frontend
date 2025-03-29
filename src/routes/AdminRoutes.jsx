import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Login from '../pages/admin/Login'
import NotFound from "../pages/common/NotFound";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="*" element={<NotFound role='admin' />} />
    </Routes>
  );
};

export default AdminRoutes;
