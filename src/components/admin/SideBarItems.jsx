import React, { useContext } from "react";
import { SideBarContext } from "../../layout/AdminLayout";
import { NavLink } from "react-router-dom";

const   SideBarItems = ({ icon, text, destination }) => {
  const { isOpen } = useContext(SideBarContext);
  return (
    <li className="relative group">
      <NavLink to={destination} className={({isActive}) => {
        return (
            "flex items-center w-full rounded-xl py-3 transition-all duration-300 " +
            (isOpen ? "px-4 justify-start " : "px-0 justify-center ") +
            (isActive ? "bg-white/10 text-white shadow-lg shadow-black/20"
            :
            "text-gray-400 hover:bg-white/5 hover:text-white")
        )
      }}>
        <span className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{icon}</span>
        <p
          className={`overflow-hidden transition-all font-montserrat font-semibold text-sm whitespace-nowrap ${
            isOpen ? "w-auto opacity-100" : "w-0 opacity-0 hidden"
          }`}
        >
          {text}
        </p>
        
        {/* Tooltip for collapsed state */}
        {!isOpen && (
          <div
            className={`absolute z-50 left-full ml-4 py-2 px-3 rounded-lg bg-white text-agency-black text-sm font-bold shadow-xl
                -translate-x-3 opacity-0 invisible transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap`}
          >
            {text}
            {/* Arrow */}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default SideBarItems;
