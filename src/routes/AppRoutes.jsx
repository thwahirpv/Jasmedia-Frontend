import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import NotFound from "../pages/common/NotFound";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import Login from "../pages/admin/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          <Route path="*" element={<UserRoutes />} />
        </Route>
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} /> 
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
