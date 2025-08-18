import React, { useEffect, useState } from 'react'
import { TextAnimate } from "@/components/magicui/text-animate";
import FloatingDot from '../common/FloatingDot';
import { motion } from 'motion/react'
import megaphone from '../../../assets/images/megaphone.png'
import { RiVipDiamondFill } from "react-icons/ri";
import CountUp from 'react-countup';
import { Marquee } from "@/components/magicui/marquee";
import { useDispatch } from 'react-redux';
import { getAllPortfolioThunk } from '@/features/portfolio/getFullPortfolio';




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
    <div className="relative w-full h-screen bg-green flex flex-col justify-center">
      <div className="space-y-[30px] transition-all flex flex-col items-center">
        <div className="px-4">
          <p className="text-user-pale text-[11px] flex items-center justify-center text-center mb-2">
            <span className="mr-2">
              <RiVipDiamondFill />
            </span>
            THE PORTFOLIO
          </p>
          <TextAnimate
            duration={0.4}
            animation="fadeIn"
            by="line"
            as="h1"
            className="text-xl md:text-4xl font-bold font-russo text-center text-white leading-relaxed max-w-2xl mx-auto"
          >
            Explore Our Projects
          </TextAnimate>
        </div>

        <div className="flex gap-3 items-center rounded-full border p-1 pr-4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
          <div className="flex items-center bg-user-pale text-green rounded-full p-2 lg:p-3">
            <CountUp
              start={0}
              end={100}
              className="font-montserrat text-xl lg:text-3xl font-bold"
            />
            <p className="font-montserrat text-3xl font-bold">+</p>
          </div>
          <p className="text-user-white font-[500] font-montserrat text-[16px] lg:text-xl">
            Projects Done
          </p>
        </div>
      </div>

      {/* Carousel */}
      {/* <div className="w-full space-y-6 flex flex-col justify-center items-center overflow-hidden lg:bg-transparent">
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
        <Marquee reverse pauseOnHover className="[--duration:20s]">
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
      </div> */}

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

export default PortfolioIntro

