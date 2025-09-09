import React from 'react'
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { TextAnimate } from "@/components/magicui/text-animate";
import FloatingDot from '../common/FloatingDot';
import { Globe } from "@/components/magicui/globe";
import { motion } from 'motion/react'
import megaphone from '../../../assets/images/megaphone.png'
import { RiVipDiamondFill } from "react-icons/ri";




const HomeIntro = () => {
  return (
    <div className="relative w-full h-screen bg-green flex justify-center rounded-b-4xl">
      <div className="mt-[160px] space-y-[35px] transition-all">
        <div className="px-4">
          <p className='text-user-pale text-[11px] flex items-center justify-center text-center mb-6'>
            <span className='mr-2'>
              <RiVipDiamondFill />
            </span>
            THE MEANING OF MARKETING
          </p>
          <TextAnimate duration={0.4} animation="fadeIn" by="line" as="h1" className="text-xl md:text-3xl font-bold font-russo text-center text-white leading-relaxed max-w-2xl mx-auto">
            Empowering Digital Dreams — Jasmedia Where Vision Meets Strategy
          </TextAnimate>
        </div>

        <div className="px-5">
          <TextAnimate
            className="text-user-gray-100 text-center text-sm max-w-xl mx-auto"
            animation="fadeIn"
            by="line"
            as="p"
            duration={0.4}
            delay={0.3}
          >
            Crafted with care for creators, dreamers, and doers — we build fast,
            beautiful, and conversion-driven digital experiences that scale with
            your ambition.
          </TextAnimate>
        </div>
      </div>
 
      {/* <div className="absolute left-1/2 z-40 translate-x-[-50%] bottom-[-130px] md:bottom-[-230px] lg:bottom-[-240px] w-[200px] md:w-[500px] lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px] rounded-full bg-white opacity-20 blur-3xl"></div>
      <Globe className="absolute left-1/2 z-40 translate-x-[-50%] bottom-[-130px] md:bottom-[-230px] lg:bottom-[-240px] max-w-[300px] sm:max-w-[400px] md:max-w-[500px] " />
       */}
      <motion.img
        className='absolute top-[9%] md:top-[6%] lg:top-[11%] left-[12%] md:left-[10%] lg:left-[14%] w-auto h-[50px] rotate-[35deg]'
        src={megaphone}
        alt=""
        animate={{
          scale: [1, 1.1, 1], 
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 1, 
          ease: "easeInOut", 
          repeat: Infinity, 
        }}
      />

      <FloatingDot
        position="top-[15%] right-[12%] translate-x-[50%] translate-y-[-50%]"
        color="bg-user-pale"
        size="p-1.5"
      />
      <FloatingDot
        position="bottom-[30%] left-[10%] translate-x-[-20%] translate-y-[30%]"
        color="bg-[#d99868]"
        size="p-1"
      />
    </div>
  );
}

export default HomeIntro
