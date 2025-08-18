import React from 'react'
import { Particles } from '../../magicui/particles';
import logoGreen from '../../../assets/images/logo_green.png'  
import { ShinyButton } from '../../magicui/shiny-button';
import { FaArrowRight } from "react-icons/fa6";


const AboutConclution = () => {
  return (
    <div className="relative w-full bg-user-smokewhite flex justify-center items-center py-24">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      <div className="flex flex-col justify-center items-center space-y-7">
        <h1
          className="text-3xl md:text-5xl font-russo font-bold text-gray-900 text-center leading-relaxed"
          data-aos="fade-up"
          data-aos-delay={1 * 100}
        >
          Empowering Vision, <br /> Elevating Brands
        </h1>
        <div
            data-aos="fade-up"
            data-aos-delay={2 * 100}
        >
          <ShinyButton className="text-user-white bg-green font-montserrat">
            Get Started Now
            <span>
              <FaArrowRight />
            </span>
          </ShinyButton>
        </div>
        <p
          className="font-montserrat font-bold text-xl md:text-3xl max-w-3xl text-gray-900 text-center"
          data-aos="fade-up"
          data-aos-delay={3 * 100}
        >
          Ignite Brand Growth With
        </p>
        <img
          className="w-[200px]"
          src={logoGreen}
          alt=""
          data-aos="fade-up"
          data-aos-delay={4 * 100}
        />
      </div>
    </div>
  );
}

export default AboutConclution
