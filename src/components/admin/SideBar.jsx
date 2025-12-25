import React, { createContext, useContext, useState } from "react";
import default_logo from "../../assets/images/default_logo.png";
import default_admin from "../../assets/images/default_admin.jpg";
import { BsTextIndentLeft, BsTextIndentRight } from "react-icons/bs";
import { SideBarContext } from "../../layout/AdminLayout";
import { useSelector, useDispatch } from "react-redux";
import { TbLogout2 } from "react-icons/tb";
import { logOut } from "../../features/auth/authSlice";
import store from "../../store/store";
import { persistStore } from "redux-persist";
import { Link } from "react-router-dom";


const SideBar = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(SideBarContext);
  const { username, email } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
    persistStore(store).purge()
    localStorage.clear()
    // cookieStore.delete() // Commented out as it might not be available or needed
  }

  return (
    <>
      {isOpen == false && (
        <div className="absolute md:hidden top-6 left-6 z-50">
          <button
            className="cursor-pointer bg-agency-black text-white p-2 rounded-full shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsTextIndentLeft size={20} />
          </button>
        </div>
      )}
      <div
        className={`flex-col justify-between h-screen transition-all duration-300 ${
          isOpen ? "w-[100%] md:w-[280px] flex" : "hidden md:flex w-[80px]"
        } bg-agency-black px-4 pt-8 border-r border-gray-800`}
      >
        <div className="flex flex-col space-y-12">
          {/* Header / Logo */}
          <div className="flex items-center justify-between px-2">
            <div className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 w-0"
              }`}>
               <Link to="/admin/dashboard" className="cursor-pointer">
                 <h1 className="text-xl font-russo text-white tracking-widest">JASMEDIA</h1>
               </Link>
            </div>
            
            <button
              className="cursor-pointer text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <BsTextIndentRight size={24} />
              ) : (
                <BsTextIndentLeft size={24} />
              )}
            </button>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">{children}</ul>

          {/* Logout */}
          <div>
            <button className={`transition-all flex items-center gap-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl cursor-pointer font-bold font-montserrat
              ${isOpen ? 'py-3 px-4 w-full' : 'py-3 px-2 justify-center' }`}
              onClick={handleLogOut}
              >
              <TbLogout2 size={24} />
              <span className={`transition-all duration-300 ${isOpen ? "opacity-100" : "hidden opacity-0"}`}>Logout</span>
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div
          className={`flex items-center py-6 border-t border-gray-800 ${isOpen ? "justify-start px-2" : "justify-center"}`}
        >
          <img className="w-10 h-10 rounded-full object-cover border-2 border-green/50" src={default_admin} alt="" />
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "ml-4 w-auto opacity-100" : "w-0 opacity-0"
            }`}
          >
            <h1 className="font-bold text-white font-montserrat text-sm truncate">
              {username}
            </h1>
            <p className="text-xs text-gray-500 font-opensans truncate max-w-[150px]">
              {email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
