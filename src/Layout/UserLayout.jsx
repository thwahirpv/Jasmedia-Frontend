import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/userComponent/navBar";
import BackgroundComponent from "../components/userComponent/Background";

const UserLayout = () => {
  return (
    <div>
         <div className="min-h-screen">  
        <Navbar></Navbar>
        <BackgroundComponent></BackgroundComponent>
      
      <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
