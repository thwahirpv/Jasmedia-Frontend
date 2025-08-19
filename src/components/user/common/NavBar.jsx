import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo.png'
import { NavLink } from "react-router-dom";
import { GrDown } from "react-icons/gr";
import { GrUp } from "react-icons/gr";
import { FcHome } from "react-icons/fc";
import { IoIosHome } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { FcGallery } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { TbArrowRoundaboutLeft } from "react-icons/tb";
import { FcBusinessContact } from "react-icons/fc";
import { RiContactsBook3Fill } from "react-icons/ri";
import { useLocation } from 'react-router-dom';



const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [currectOption, setCurrentOption] = useState('home')
  const location = useLocation();


  const options = {
    HOME: 'home',
    PORTFOLIO: 'portfolio',
    ABOUT: 'about',
    CONTACT: 'contact'
  }

  const optionsIcon = {
    [options.HOME]: <FcHome />,
    [options.PORTFOLIO]: <FcGallery />,
    [options.ABOUT]: <FcAbout />,
    [options.CONTACT]: <FcBusinessContact />
  }

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }

  const onOptionClick = () => {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case '/':
        setCurrentOption('home');
        break;
      case '/portfolio':
        setCurrentOption('portfolio');
        break;
      case '/about':
        setCurrentOption('about');
        break;
      case '/contact':
        setCurrentOption('contact');
        break;
      case '/admin/login':
        setCurrentOption('admin')
        break;
      default:
        setCurrentOption('home');
    }
  }, [location.pathname]);

  return (
    <div className='relative w-full bg-green flex justify-center md:justify-between items-center border-b border-user-slate-grey z-50'>
      {/* Logo side */}
      <div>
        {/* logo */}
        <NavLink to="/">
          <img className='md:w-[140px] w-[130px]' src={logo} alt="JM" />
        </NavLink>
      </div>

      {/* Options side */}
      <div className={`px-[20px] md:px-0 md:pr-[20px] w-full md:w-fit absolute md:static top-full transition-all duration-500 ease-in-out transform  ${isNavOpen ? "translate-y-2 opacity-100 visible" : "-translate-y-[300px] md:translate-0 opacity-0 md:opacity-100 invisible md:visible"}`}>
        <div className='flex bg-user-white md:bg-transparent w-full rounded-md px-[10px] py-[20px]'>
          {/* Options */}
          <ul className='flex w-full md:flex-row flex-col md:space-x-[20px] space-y-2.5 md:space-y-0 transition-all'>
            <li className='' onClick={onOptionClick}>
                <NavLink to="/"
                className={({ isActive }) => 
                ("text-[15px] md:text-sm px-4 py-2 md:py-1.5 ransition-all duration-300 ease-in-out flex items-center text-center " + (isActive ? `bg-user-pale rounded-md md:rounded-full ${isNavOpen ? "text-gray-950" : 'text-green'}` : "text-gray-950 md:text-user-gray-100"))}>
                  <span className='mr-2 block md:hidden'>
                    <FcHome />
                  </span>
                  Home
                </NavLink>
            </li>
            <li className='' onClick={onOptionClick}>
                <NavLink to="/portfolio"
                className={({ isActive }) => 
                ("text-[15px] md:text-sm px-4 py-2 md:py-1.5 ransition-all duration-300 ease-in-out flex items-center text-center " + (isActive ? `bg-user-pale rounded-md md:rounded-full ${isNavOpen ? "text-gray-950" : 'text-green'}` : "text-gray-950 md:text-user-gray-100"))}>
                  <span className='mr-2 block md:hidden'>
                    <FcGallery />
                  </span>
                  Portfolio
                </NavLink>
            </li>
            <li className='' onClick={onOptionClick}>
                <NavLink to="/services"
                className={({ isActive }) => 
                ("text-[15px] md:text-sm px-4 py-2 md:py-1.5 ransition-all duration-300 ease-in-out flex items-center text-center " + (isActive ? `bg-user-pale rounded-md md:rounded-full ${isNavOpen ? "text-gray-950" : 'text-green'}` : "text-gray-950 md:text-user-gray-100"))}>
                  <span className='mr-2 block md:hidden'>
                    <FcGallery />
                  </span>
                  Services
                </NavLink>
            </li>
            <li className='' onClick={onOptionClick}>
                <NavLink to="/about"
                className={({ isActive }) => 
                ("text-[15px] md:text-sm px-4 py-2 md:py-1.5 ransition-all duration-300 ease-in-out flex items-center text-center " + (isActive ? `bg-user-pale rounded-md md:rounded-full ${isNavOpen ? "text-gray-950" : 'text-green'}` : "text-gray-950 md:text-user-gray-100"))}>
                  <span className='mr-2 block md:hidden'>
                    <FcAbout />
                  </span>
                  About
                </NavLink>
              </li>
            <li className='' onClick={onOptionClick}>
                <NavLink to="/contact"
                className={({ isActive }) => 
                ("text-[15px] md:text-sm px-4 py-2 md:py-1.5 ransition-all duration-300 ease-in-out flex items-center text-center " + (isActive ? `bg-user-pale rounded-md md:rounded-full ${isNavOpen ? "text-gray-950" : 'text-green'}` : "text-gray-950 md:text-user-gray-100"))}>
                  <span className='mr-2 block md:hidden'>
                    <FcBusinessContact />
                  </span>
                  Contact Us
                </NavLink>
            </li>
            <li className='' onClick={onOptionClick}>
                <NavLink to="/admin/login"
                className={({ isActive }) => 
                ("text-[15px] md:text-sm px-4 py-2 md:py-1.5 ransition-all duration-300 ease-in-out flex items-center text-center " + (isActive ? `bg-user-pale rounded-md md:rounded-full ${isNavOpen ? "text-gray-950" : 'text-green'}` : "text-gray-950 md:text-user-gray-100"))}>
                  <span className='mr-2 block md:hidden'>
                    <FcBusinessContact />
                  </span>
                  Admin
                </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* menu icon */}
      <div className='absolute right-0.5 bg-user-white p-1 rounded-full md:hidden flex justify-center items-center space-x-2' 
      onClick={onNavToggle}>
        <p className='bg-user-pale p-1 rounded-full text-center text-[17px] transition-all duration-500 ease-in-out'>
          { optionsIcon[currectOption] || null }
        </p>
        <p className='text-[17px] p-1 transition-all duration-500 ease-in-out'>
          {
            isNavOpen ? 
            <GrUp />
            :
            <GrDown />
          }
        </p>
      </div>


    </div>
  )
}

export default NavBar
