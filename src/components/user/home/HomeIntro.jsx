import React from 'react'
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { TextAnimate } from "@/components/magicui/text-animate";
import FloatingDot from '../common/FloatingDot';
import { Globe } from "@/components/magicui/globe";
import { motion } from 'motion/react'
import megaphone from '../../../assets/images/megaphone.png'
import { RiVipDiamondFill } from "react-icons/ri";
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Particles } from "@/components/magicui/particles";
import { Link } from 'react-router-dom';

const HomeIntro = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-user-white">
      
      {/* Background Particles - darker color for visibility on white */}
      <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0"
            quantity={100}
            staticity={50}
            color="#0a0a0a" 
            ease={50}
          />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center space-y-8">
        
        {/* Tagline / Pre-heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 text-green font-medium text-xs md:text-sm border border-green/20"
        >
          <span className="w-2 h-2 rounded-full bg-green animate-pulse"></span>
          Elevating Digital Experiences
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-russo text-agency-black leading-tight tracking-tight"
        >
          Vision Meets <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-600">Strategy.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-base md:text-lg text-gray-600 font-opensans leading-relaxed"
        >
          We craft beautiful, high-converting digital solutions for dreamers and doers. 
          Scale your ambition with a team that understands your vision.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link to="/contact" className="group relative px-5 py-2.5 bg-agency-black text-white rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-green/20">
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16}/>
            </span>
          </Link>
          
          <Link to="/portfolio" className="px-5 py-2.5 bg-white text-agency-black border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-sm">
            View Our Work
          </Link>
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

    </section>
  );
}

export default HomeIntro
