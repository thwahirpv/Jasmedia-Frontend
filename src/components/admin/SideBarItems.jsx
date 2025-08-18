import React, { useContext } from "react";
import { SideBarContext } from "../../layout/AdminLayout";
import { NavLink } from "react-router-dom";

const   SideBarItems = ({ icon, text, destination }) => {
  const { isOpen } = useContext(SideBarContext);
  return (
    <li className="relative flex md:justify-start group">
      <NavLink to={destination} className={({isActive}) => {
        return (
            "flex w-full rounded-md py-4 md:py-2.5 px-2.5 cursor-pointer " +
            (isActive ? "bg-light-gray-300 dark:bg-dark-blue-400"
            :
            "hover:bg-light-gray-300 dark:hover:bg-dark-blue-400")
        )
      }}>
        <span className="text-light-gray-950 dark:text-dark-white">{icon}</span>
        <p
          className={`overflow-hidden transition-all text-light-gray-950 dark:text-dark-gray text-sm font-[450] text-[16px] md:text-[14px] ${
            isOpen ? "ml-3 w-[100px]" : "ml-0 w-0"
          }`}
        >
          {text}
        </p>
        {!isOpen && (
          <p
            className={`hidden md:block absolute z-50 left-full ml-7 py-1 px-2 rounded-md bg-light-gray-950 dark:bg-dark-white text-light-white dark:text-dark-blue-900
                -translate-x-3 opacity-20 invisible transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
          >
            {text}
          </p>
        )}
      </NavLink>
    </li>
  );
};

export default SideBarItems;
