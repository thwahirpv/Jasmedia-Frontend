import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import SideBarItems from "../components/admin/SideBarItems";
import { BsTextIndentRight } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

export const SideBarContext = createContext();

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex">
      

      <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
          <SideBar>
            <SideBarItems icon={<MdSpaceDashboard size={25} />} text="Dashboard" />
            <SideBarItems icon={<FaNetworkWired size={25} />} text="Porfolio" />
            <SideBarItems icon={<MdFeedback size={25} />} text="Feedback" />
          </SideBar>
      </SideBarContext.Provider>
      <div className={`${isOpen && "hidden md:block"} w-full`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
