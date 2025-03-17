import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/admin/Home";
import AdminLayout from "./AdminLayout";
import Login from '../pages/admin/Login'
import NotFound from "../pages/common/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
        <Route index element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="*" element={<NotFound role='admin' />} />
    </Routes>
  );
};

export default AdminRoutes;
