import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import CountUp from 'react-countup';
import { useDispatch } from 'react-redux';
import { getAllPortfolioThunk } from '@/features/portfolio/getFullPortfolio';
import { Particles } from "@/components/magicui/particles";
import { ChevronDown } from 'lucide-react';

const PortfolioIntro = () => {
  const [portfolios, setPortfolios] = useState([])
  const dispatch = useDispatch()

  const getAllPortfolio = async () => {
    try {
      const response = await dispatch(getAllPortfolioThunk()).unwrap()
      setPortfolios(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllPortfolio()
  }, [])
    
  return (
    <div className="relative w-full min-h-[70vh] flex flex-col justify-center items-center bg-white overflow-hidden pt-20">
      
      <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0"
            quantity={80}
            staticity={50}
            color="#0a0a0a" 
            ease={50}
          />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs md:text-sm font-bold uppercase tracking-wider"
        >
          Our Portfolio
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-russo text-agency-black leading-tight tracking-tight"
        >
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-600">Works.</span>
        </motion.h1>

         <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-base md:text-lg text-gray-600 font-opensans leading-relaxed"
        >
           A showcase of our finest digital experiences, from branding to web development.
        </motion.p>

        {/* Stats */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex items-center gap-4 px-8 py-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm mt-8"
        >
          <div className="text-4xl font-bold font-russo text-green">
            <CountUp end={100} duration={3} />+
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">Projects</p>
            <p className="text-xs text-gray-500">Successfully Delivered</p>
          </div>
        </motion.div>
      </div>

       {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 1, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>

    </div>
  );
}

export default PortfolioIntro

