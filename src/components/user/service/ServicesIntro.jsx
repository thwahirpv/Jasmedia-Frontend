import React from 'react'
import { motion } from 'motion/react'
import { RiVipDiamondFill } from 'react-icons/ri'
import { TextAnimate } from '../../magicui/text-animate'
import megaphone from '../../../assets/images/megaphone.png'
import FloatingDot from '../common/FloatingDot'

const ServicesIntro = () => {
  return (
    <div className="relative w-full h-screen bg-green flex justify-center">
      <div className="mt-[160px] space-y-[35px] transition-all">
        <div className="px-4">
          <p className='text-user-pale text-[11px] flex items-center justify-center text-center mb-6'>
            <span className='mr-2'>
              <RiVipDiamondFill />
            </span>
            SERVICES
          </p>
          <TextAnimate duration={0.4} animation="fadeIn" by="line" as="h1" className="text-xl md:text-3xl font-bold font-russo text-center text-white leading-relaxed max-w-2xl mx-auto">
            Crafting Success Stories Through Smart Advertising
          </TextAnimate>
        </div>

        <div className="px-5">
          <TextAnimate
            className="text-user-gray-100 text-center text-sm max-w-xl mx-auto leading-relaxed"
            animation="fadeIn"
            by="line"
            as="p"
            duration={0.4}
            delay={0.3}
          >
            At Jasmedia, we don’t just create ads — we create brands that connect. 
            Our full-suite advertising solutions are built around your unique business goals. 
            From the very first interaction, we take the time to understand your vision, audience, and challenges.
            We then craft tailored strategies that combine creativity, data, and storytelling to deliver impactful results. 
            Whether it's digital marketing, branding, or campaign execution — we ensure every step aligns with your success. 
            With us, your brand doesn't just get seen — it gets remembered.
          </TextAnimate>
        </div>
      </div>

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
  )
}

export default ServicesIntro
