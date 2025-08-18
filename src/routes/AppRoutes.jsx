import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import NotFound from "../pages/common/NotFound";
import UserLayout from "../layout/UserLayout.jsx";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/admin/Login";
import ForgetPassword from "../pages/admin/ForgetPassword";
import Otp from "../pages/admin/Otp";
import ChangePassword from "../pages/admin/ChangePassword";
import ScrollToTop from "@/components/user/common/ScrollToTop";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          {UserRoutes()}
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} /> 
        <Route path="/admin/forgot-password" element={ <ForgetPassword />} />
        <Route path="/admin/otp" element={ <Otp />} />
        <Route path="/admin/password" element={<ChangePassword />}/>
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
