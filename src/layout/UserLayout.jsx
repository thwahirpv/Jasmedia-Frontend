import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/user/common/NavBar";
import { Particles } from "@/components/magicui/particles";
import LoadingScreen from "@/components/user/common/LoadingScreen";
import Footer from "@/components/user/common/Footer";
import FloatingDot from "@/components/user/common/FloatingDot";


const UserLayout = () => {
  return (
    <div className="scroll-smooth min-h-screen bg-user-white text-user-gray-900 font-opensans selection:bg-green selection:text-white">
      {/* Navigation bar - wrapper removed as NavBar handles its own positioning */}
      <NavBar />
      
      {/* Main Content with top padding for fixed navbar */}
      <main className="relative z-0 pt-16">
        <Outlet />
      </main>
      
      <Footer />
      <FloatingDot />
    </div>
  );
};

export default UserLayout;


