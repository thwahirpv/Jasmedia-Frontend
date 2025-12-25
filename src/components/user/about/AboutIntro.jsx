import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Marquee } from '@/components/magicui/marquee'
import { Particles } from "@/components/magicui/particles";
import { useDispatch } from 'react-redux'
import { getAllPortfolioThunk } from '@/features/portfolio/getFullPortfolio'
import { ChevronDown } from 'lucide-react';

const AboutIntro = () => {
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
    <section className="relative w-full min-h-screen bg-white flex flex-col justify-center items-center overflow-hidden pt-20">
      
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
          About JasMedia
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-russo text-agency-black leading-tight tracking-tight max-w-5xl"
        >
          Crafting Impactful Stories that <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-600">Inspire and Sell.</span>
        </motion.h1>

         <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-base md:text-lg text-gray-600 font-opensans leading-relaxed"
        >
            Step into a world where creativity meets purpose. We fuse strategic thinking with emotionally resonant storytelling to create advertising that not only connects — it converts.
        </motion.p>
      </div>

      {/* Carousel/Ticker */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 0.8 }}
         className="w-full mt-24 border-y border-gray-100 bg-gray-50/50 backdrop-blur-sm py-8"
      >
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Clients & Projects</p>
        <Marquee pauseOnHover className="[--duration:40s]">
          {portfolios.map((portfolio, index) => (
            <div
              key={index}
              className="mx-6 w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer flex items-center justify-center"
            >
              <img
                src={portfolio.secureUrl}
                alt=""
                className="max-w-full max-h-full object-contain rounded-md"
              />
            </div>
          ))}
        </Marquee>
      </motion.div>
      
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

    </section>
  );
}

export default AboutIntro
