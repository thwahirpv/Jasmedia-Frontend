import React, { Children, createContext, useState } from "react";
import { BsTextIndentLeft } from "react-icons/bs";
import { BsTextIndentRight } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import default_admin from "../../assets/images/default_admin.jpg";
import { useScroll } from "framer-motion";

export const SideBarContext = createContext();

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside className="h-screen relative">
      {isOpen == false && (
        <div className="absolute z-10 top-6 left-3 block md:hidden">
          <button
            className={`cursor-pointer p-2 hover:bg-light-gray-300 dark:hover:bg-dark-blue-900 text-light-gray-950 dark:text-dark-white ${
              isOpen == false && "px-5"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsTextIndentLeft size={25} />
          </button>
        </div>
      )}

      <nav
        className={`relative h-full md:flex flex-col gap-12 bg-light-white dark:bg-dark-blue-600 border-r shadow-sm border-r-light-gray-300 dark:border-r-dark-gray md:px-5 md:py-5 transition-transform ${
          isOpen ? "p-5" : "py-5 px-1 md:py-5 md:px-5 hidden"
        }`}
      >
        <div className="flex space-x-[100px]">
          <h1
            className={`font-[900] text-xl p-2 text-light-gray-950 dark:text-dark-white transition-all ${
              isOpen ? "block" : "hidden"
            }`}
          >
            JAZMEDIA
          </h1>
          <button
            className={`cursor-pointer p-2 hover:bg-light-gray-300 dark:hover:bg-dark-blue-900 rounded-md text-light-gray-950 dark:text-dark-white ${
              isOpen == false && "px-5"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsTextIndentLeft size={25} />
          </button>
        </div>
        <SideBarContext.Provider value={{ isOpen }}>
          <ul className="">{children}</ul>
        </SideBarContext.Provider>
        <div className="absolute w-full bottom-0 right-0 left-0 flex items-center gap-3 py-4 px-5 border-t-light-gray-300 dark:border-t-dark-blue-900 border-t">
          <img className="rounded-full w-[40px]" src={default_admin} alt="" />
          <div className={`${isOpen ? "block" : "hidden"}`}>
            <h3 className="font-[500] text-md text-light-gray-950 dark:text-dark-white">
              Rashid
            </h3>
            <p className="font-[400] text-[12px] text-light-gray-950 dark:text-dark-gray">
              rashod@gmail.com
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
