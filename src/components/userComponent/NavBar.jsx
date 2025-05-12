import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-secondary  text-white flex justify-between items-center p-4 relative">
      <div className="flex items-center">
        <span className="bg-primary text-white font-bold text-xl p-2 rounded-full mr-2">VA</span>
        <span className="text-xl font-bold text-primary">VisAd</span>
      </div>
      <div
        className="md:hidden flex flex-col cursor-pointer z-10"
        onClick={toggleMobileMenu}
      >
        <span className={`h-0.5 w-6 bg-primary mb-1 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`h-0.5 w-6 bg-primary mb-1 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`h-0.5 w-6 bg-primary transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </div>
      <ul
        className={`md:flex md:space-x-6 md:items-center absolute md:static top-16 left-0 w-full bg-secondary md:w-auto md:bg-transparent transition-all duration-300 mr-36 text-md font-family-poppins ${
          isMobileMenuOpen ? 'flex flex-col space-y-4 p-4' : 'hidden'
        }`}
      >
       <li>
  <NavLink
    to="/"
    exact
    className={({ isActive }) =>
      `text-primary hover:text-white transition-colors ${isActive ? 'text-white' : ''}`
    }
    onClick={() => setIsMobileMenuOpen(false)}
  >
    Home
  </NavLink>
</li>
<li>
  <NavLink
    to="/about"
    className={({ isActive }) =>
      `text-primary hover:text-white transition-colors ${isActive ? 'text-white' : ''}`
    }
    onClick={() => setIsMobileMenuOpen(false)}
  >
    About Us
  </NavLink>
</li>
<li>
  <NavLink
    to="/services"
    className={({ isActive }) =>
      `text-primary hover:text-white transition-colors ${isActive ? 'text-white' : ''}`
    }
    onClick={() => setIsMobileMenuOpen(false)}
  >
    Services
  </NavLink>
</li>
<li>
  <NavLink
    to="/portfolio"
    className={({ isActive }) =>
      `text-primary hover:text-white transition-colors ${isActive ? 'text-white' : ''}`
    }
    onClick={() => setIsMobileMenuOpen(false)}
  >
    Portfolio
  </NavLink>
</li>
<li>
  <NavLink
    to="/contact"
    className={({ isActive }) =>
      `text-white  hover:text-white transition-colors   p-3 rounded-3xl b  ${isActive ? '' : 'bg-primary border'}`
    }
    onClick={() => setIsMobileMenuOpen(false)}
  >
    Contact
  </NavLink>
</li>
      </ul>
    </nav>
  );
};


