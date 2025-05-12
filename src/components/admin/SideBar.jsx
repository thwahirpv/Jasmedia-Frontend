import React, { createContext, useContext, useState } from "react";
import default_logo from "../../assets/images/default_logo.png";
import default_admin from "../../assets/images/default_admin.jpg";
import { BsTextIndentLeft, BsTextIndentRight } from "react-icons/bs";
import { SideBarContext } from "../../routes/AdminLayout";
import { useSelector, useDispatch } from "react-redux";
import { TbLogout2 } from "react-icons/tb";
import { logOut } from "../../features/auth/authSlice";
import store from "../../store/store";
import { persistStore } from "redux-persist";


const SideBar = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(SideBarContext);
  const { username, email, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
    persistStore(store).purge()
    localStorage.clear()
  }
  return (
    <>
      {isOpen == false && (
        <div className="absolute md:hidden top-6 left-6 z-50">
          <button
            className="cursor-pointer bg-light-white text-light-gray-950 dark:bg-dark-blue-400 dark:text-dark-white p-1.5 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsTextIndentLeft size={25} />
          </button>
        </div>
      )}
      <div
        className={`flex-col justify-between h-screen ${
          isOpen ? "w-[100%] md:w-[300px] flex" : "hidden md:flex"
        } bg-light-white dark:bg-dark-blue-600 px-[20px] pt-5 border-r-2 border-r-light-gray-300 dark:border-r-dark-blue-400 shadow-md shadow-light-gray-300 dark:shadow-dark-blue-400`}
      >
        <div className="flex flex-col space-y-[70px] md:space-y-16">
          <div className="flex items-center justify-between">
            <img
              className={`overflow-hidden transition-all ${
                isOpen ? "w-[45px] rounded-full" : "w-0 "
              }`}
              src={default_logo}
              alt=""
            />
            <button
              className="cursor-pointer bg-light-gray-300 dark:bg-dark-blue-400 dark:text-dark-white p-1.5 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <BsTextIndentRight size={25} />
              ) : (
                <BsTextIndentLeft size={25} />
              )}
            </button>
          </div>

          <ul className="pb-4 border-b-2 border-b-light-gray-300 dark:border-b-dark-blue-400 space-y-1">{children}</ul>

          <div>
            <button className={`transition-all bg-red-500 hover:bg-red-600  text-light-gray-950 text-sm font-medium rounded-md cursor-pointer
              ${isOpen ? 'py-4 md:py-2.5 px-2.5 w-full' : 'py-4 md:py-2.5 px-2.5' }`}
              onClick={handleLogOut}
              >
              {
                isOpen ? 
                'Logout' 
                :
                <TbLogout2 size={18} />
              }
            </button>
          </div>
        </div>

        <div
          className={`flex items-center leading-4 py-3 border-t-2 border-t-light-gray-300 dark:border-dark-blue-400`}
        >
          <img className="w-[40px]" src={default_admin} alt="" />
          <div
            className={`overflow-hidden transition-all ${
              isOpen ? "md:w-[200px] ml-3" : "w-0"
            }`}
          >
            <h1 className="font-semibold text-light-gray-950 dark:text-dark-white">
              {username}
            </h1>
            <p className="text-xs text-light-gray-800 dark:text-dark-gray">
              {email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
