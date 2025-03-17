import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import UserLayout from "./UserLayout";
import NotFound from "../pages/common/NotFound";

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound role='user' />} />
    </Routes>
  );
};

export default UserRoutes;
