import React from 'react'
import white_logo from '../../../assets/images/white-logo.png'
import { ShinyButton } from "@/components/magicui/shiny-button";
import { FaRegCopyright } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <div className='w-full bg-green flex flex-col items-center justify-center px-8 py-9 space-y-8'>
      {/* Logo */}
      <div className='w-full flex justify-center lg:justify-start border-b'>
        <img className='max-w-72' src={white_logo} alt="" />
      </div>

      {/* Content and Links */}
      <div className='w-full flex flex-col gap-14 lg:flex-row justify-center lg:justify-between lg:items-start items-center px-14 py-6'>
        <div className='space-y-8 lg:space-y-20'>
            <h1 className='font-bold font-russo text-center lg:text-left text-user-pale text-2xl lg:text-6xl'>
                Get Ready to <br/> Grow Your Business
            </h1>

            <div className='lg:space-x-8 space-x-0 space-y-3 lg:space-y-0  flex flex-col lg:flex-row items-center'>
                <ShinyButton className='text-user-white'>contact@jasmedia.co</ShinyButton>
                <ShinyButton className='text-user-white'>+1 (548) 333-2232</ShinyButton>
            </div>
        </div>

        <div className=''>
            <div className='space-y-4'>
                <h2 className='text-user-white font-bold font-montserrat text-xl'>Quick Links</h2>
                <ul className='space-y-3 text-center lg:text-left'>
                    <li className='text-sm font-montserrat text-user-white p-1 cursor-pointer'>
                      <NavLink to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className='text-sm font-montserrat text-user-white p-1 cursor-pointer'>
                      <NavLink to="/portfolio">
                        Portfolio
                      </NavLink>
                    </li>
                    <li className='text-sm font-montserrat text-user-white p-1 cursor-pointer'>
                      <NavLink to="/services">
                        Services
                      </NavLink>
                    </li>
                    <li className='text-sm font-montserrat text-user-white p-1 cursor-pointer'>
                      <NavLink to="/about">
                        About
                      </NavLink>
                    </li>
                    <li className='text-sm font-montserrat text-user-white p-1 cursor-pointer'>
                      <NavLink to="/contact">
                        Contact Us
                      </NavLink>
                    </li>
                </ul>
            </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='w-full pt-10 flex justify-center items-center gap-x-3'>
        <p className='text-center text-user-gray-100'>
          <FaRegCopyright />
        </p>
        <p className='text-center text-user-gray-100'>2025 Jasmedia All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
