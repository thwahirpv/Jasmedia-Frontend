import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import SideBarItems from "../components/admin/SideBarItems";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";



const AdminLayout = () => {
  return (
    <div className='flex'>
      <SideBar>
        <SideBarItems icon={<MdSpaceDashboard size={23} />} text="Dashboard" />
        <SideBarItems icon={<FaNetworkWired size={23} />} text="Portfolio" />
        <SideBarItems icon={<MdFeedback size={23} />} text="Feedback" />
      </SideBar>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
