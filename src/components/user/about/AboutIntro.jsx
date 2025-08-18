import React, { useEffect, useState } from 'react'
import { RiVipDiamondFill } from 'react-icons/ri'
import { TextAnimate } from '../../magicui/text-animate'
import { Marquee } from '../../magicui/marquee'
import { motion } from 'motion/react'
import FloatingDot from '../common/FloatingDot'
import megaphone from '../../../assets/images/megaphone.png'
import { getAllPortfolioThunk } from '@/features/portfolio/getFullPortfolio'
import { useDispatch } from 'react-redux'

const AboutIntro = () => {
    const [portfolios, setPortfolios] = useState([])
    const dispatch = useDispatch()

    const getAllPortfolio = async () => {
    try {
      const response = await dispatch(getAllPortfolioThunk()).unwrap()
      console.log(response)
      setPortfolios(response.data)
    } catch (error) {
      console.log(error)
    }
  }

    useEffect(() => {
      getAllPortfolio()
    }, [])

  return (
    <div className="relative w-full h-screen bg-green flex flex-col justify-start gap-y-16 md:gap-y-28 lg:gap-16">
      <div className="mt-40 space-y-[30px] transition-all flex flex-col justify-center items-center">
        <div className="px-4">
          <p className="text-user-pale text-[11px] flex items-center justify-center text-center mb-2">
            <span className="mr-2">
              <RiVipDiamondFill />
            </span>
            ABOUT US
          </p>
          <TextAnimate
            duration={0.4}
            animation="fadeIn"
            by="line"
            as="h1"
            className="text-xl md:text-3xl font-bold font-russo text-center text-white leading-relaxed max-w-2xl mx-auto"
          >
            Crafting Impactful Stories that Inspire and Sell
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
            Step into a world where creativity meets purpose. 
            We fuse strategic thinking with emotionally resonant 
            storytelling to create advertising that not only connects — it converts. 
            Elevate your brand with campaigns designed to leave a lasting impression.
          </TextAnimate>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full flex justify-center items-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {portfolios.map((portfolio, index) => (
            <div
              key={index}
              className="h-[150px] w-[200px] mx-3 flex justify-center items-center"
            >
              <img
                src={portfolio.secureUrl}
                alt=""
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <motion.img
        className="absolute top-[9%] md:top-[6%] lg:top-[11%] left-[12%] md:left-[10%] lg:left-[14%] w-auto h-[50px] rotate-[35deg]"
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

export default AboutIntro
