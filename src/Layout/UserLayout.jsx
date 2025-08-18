import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/user/common/NavBar";
import { Particles } from "@/components/magicui/particles";
import LoadingScreen from "@/components/user/common/LoadingScreen";


const UserLayout = () => {
  return (
    <div className="scroll-smooth bg-[#f3f6f4]">
      {/* Navigation bar */}
      <div className="w-full md:px-[50px] px-[15px] bg-green">
        <NavBar />
      </div>
      <LoadingScreen />
      <Outlet />
    </div>
  );
};

export default UserLayout;


