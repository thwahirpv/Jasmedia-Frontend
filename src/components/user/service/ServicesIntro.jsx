import React from 'react'
import { motion } from 'motion/react'
import { Particles } from "@/components/magicui/particles";

const ServicesIntro = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-user-white overflow-hidden pt-20">
      
       <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0"
            quantity={80}
            staticity={50}
            color="#0a0a0a" 
            ease={50}
          />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs md:text-sm font-bold uppercase tracking-wider"
        >
          Our Capabilities
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-russo text-agency-black leading-tight max-w-4xl"
        >
          Crafting Success Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-600">Smart Strategy</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-base md:text-lg text-gray-600 font-opensans leading-relaxed"
        >
           We don’t just create ads — we create brands that connect. 
           Our tailored strategies combine creativity, data, and storytelling to deliver impactful results.
        </motion.p>
      </div>
    </section>
  )
}

export default ServicesIntro
