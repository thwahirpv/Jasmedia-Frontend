import React from 'react'
import white_logo from '../../../assets/images/white-logo.png'
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='w-full bg-agency-black text-white pt-20 pb-10 rounded-t-[3rem] mt-10'>
      <div className='max-w-7xl mx-auto px-6'>
        
        {/* Top Section: CTA and Branding */}
        <div className='flex flex-col lg:flex-row justify-between items-start mb-20 gap-10'>
          <div className='max-w-2xl'>
            <h2 className='font-russo text-4xl md:text-6xl mb-6 leading-tight'>
              Let's Build Something <span className='text-green text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-400'>Amazing</span> Together.
            </h2>
            <div className='flex flex-col sm:flex-row gap-4 mt-8'>
               <a href="mailto:contact@jasmedia.co" className='group flex items-center gap-3 px-5 py-2 bg-white text-agency-black rounded-full font-bold text-sm hover:bg-green hover:text-white transition-all duration-300'>
                 <Mail size={16} />
                 <span>contact@jasmedia.co</span>
                 <ArrowRight className='group-hover:translate-x-1 transition-transform' size={16}/>
               </a>
               <a href="tel:+15483332232" className='group flex items-center gap-3 px-5 py-2 border border-white/20 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300'>
                 <Phone size={16} />
                 <span>+1 (548) 333-2232</span>
               </a>
            </div>
          </div>

          <div className='flex flex-col gap-6 lg:items-end'>
            <img className='w-48 opacity-90' src={white_logo} alt="Jasmedia" />
            <p className='text-gray-400 max-w-xs lg:text-right'>
              Premium digital marketing agency helping brands grow through innovation and strategy.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className='h-px w-full bg-white/10 mb-10'></div>

        {/* Bottom Section: Links and Copyright */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-montserrat'>
          
          <div className='flex gap-8'>
            <Link to="/" className='hover:text-white transition-colors'>Home</Link>
            <Link to="/portfolio" className='hover:text-white transition-colors'>Portfolio</Link>
            <Link to="/services" className='hover:text-white transition-colors'>Services</Link>
            <Link to="/about" className='hover:text-white transition-colors'>About</Link>
            <Link to="/contact" className='hover:text-white transition-colors'>Contact</Link>
          </div>

          <div className='flex items-center gap-2'>
            <span>&copy; {new Date().getFullYear()} Jasmedia. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
