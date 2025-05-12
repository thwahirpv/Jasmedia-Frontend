import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Login from "../pages/admin/Login";
import NotFound from "../pages/common/NotFound";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Portfolio from "../pages/admin/Portfolio";
import Feedbak from "../pages/admin/Feedbak";
import Protected from "./Protected";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/category"
        element={
          <Protected>
            <Category />
          </Protected>
        }
      />
      <Route
        path="/portfolio"
        element={
          <Protected>
            <Portfolio />
          </Protected>
        }
      />
      <Route
        path="/feedback"
        element={
          <Protected>
            <Feedbak />
          </Protected>
        }
      />
      
      <Route path="*" element={<NotFound role="admin" />} />
    </Routes>
  );
};

export default AdminRoutes;
