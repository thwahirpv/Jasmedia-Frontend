import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo_green.png'
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, Briefcase, Layers, User, Phone } from 'lucide-react'; // Clean line icons

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation();

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }

  // Handle scroll effect for glass navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close nav on route change
  useEffect(() => {
    setIsNavOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Portfolio', path: '/portfolio', icon: <Briefcase size={18} /> },
    { name: 'Services', path: '/services', icon: <Layers size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ]

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 ' : 'py-4 bg-transparent'}`}>
      <div className={`mx-auto transition-all duration-300 max-w-7xl md:w-[90%] w-[95%] rounded-full px-6 flex justify-between items-center ${scrolled ? 'glass shadow-sm py-2' : 'glass-transparent'}`}>
        
        {/* Logo side */}
        <div className="flex items-center">
          <NavLink to="/">
            {/* Assuming logo needs to be visible on both backgrounds, checking if we need a filter or different logo. keeping as is for now */}
            <img className='h-8 md:h-10 w-auto object-contain' src={logo} alt="Jasmedia" />
          </NavLink>
        </div>

        {/* Desktop Options */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
             <NavLink 
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${isActive 
                  ? 'bg-green text-white shadow-md' 
                  : 'text-gray-700 hover:text-green hover:bg-green/10'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-700 hover:text-green focus:outline-none"
          onClick={onNavToggle}
        >
          {isNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
    </nav>

    {/* Mobile Mobile Menu Content */}
    <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        {navLinks.map((link) => (
             <NavLink 
              key={link.name}
              to={link.path}
              onClick={() => setIsNavOpen(false)}
              className={({ isActive }) => 
                `px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-3
                ${isActive 
                  ? 'bg-green text-white shadow-lg scale-105' 
                  : 'text-gray-800 hover:text-green hover:bg-gray-100'}`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
          

      </div>
    </div>
    </>
  )
}

export default NavBar
