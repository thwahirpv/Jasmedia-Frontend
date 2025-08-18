"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaIndustry, FaImage } from "react-icons/fa";
import { RiVipDiamondFill } from "react-icons/ri";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Particles } from "../../magicui/particles";


const features = [
  {
    title: "Fully Managed",
    description: "We handle everything — from updates to security — so you can focus on growing your business.",
    icon: <FaCheckCircle />,
    bg: "bg-green",
    textColor: 'text-user-white',
    iconColor: 'text-green bg-user-white'
  },
  {
    title: "Saves Time",
    description: "Free up to 10+ hours monthly you'd otherwise spend on managing campaigns or platforms.",
    icon: <FaClock />,
    bg: "bg-user-white",
    textColor: 'text-green',
    iconColor: 'bg-green text-user-gray-50'
  },
  {
    title: "Tailored for Agencies",
    description: "Optimized solutions crafted especially for creative and ad-focused businesses.",
    icon: <FaIndustry />,
    bg: "bg-user-white",
    textColor: 'text-green',
    iconColor: 'bg-green text-user-gray-50'
  },
  {
    title: "Premium Brand Identity",
    description: "Elevate your image with sleek design and messaging aligned to premium standards.",
    icon: <FaImage />,
    bg: "bg-user-white",
    textColor: 'text-green',
    iconColor: 'bg-green text-user-gray-50'
  },
];


const WhyChooseUs = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#f3f6f4] flex items-center px-6 py-20">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-cente md:justify-between  gap-10">
        {/* Left Side Text */}
        <motion.div
          data-aos="fade-up"
          data-aos-delay={1 * 100}
          className="flex-1 flex flex-col justify-center items-center md:justify-start md:items-start"
        >
          <p className="text-[#e58952] text-[11px] flex items-center font-montserrat uppercase tracking-wide">
            <span className="mr-2">
              <RiVipDiamondFill />
            </span>
            Our Services
          </p>
          <h2 className="text-4xl text-center md:text-left font-russo font-bold mt-2 text-gray-900 leading-tight">
            Why choose <span className="text-[#e58952]">Jasmedia</span>?
          </h2>
          <p className="text-gray-600 mt-4 text-[15px] font-montserrat text-center md:text-left">
            We empower creative professionals and agencies with premium
            advertising solutions — no technical headaches, just results.
          </p>
          <button className="w-fit mt-6 px-6 py-3 flex items-center cursor-pointer justify-center gap-2  bg-user-pale text-green rounded-full text-sm font-medium transition-all duration-300 shadow-md">
            Get started now
            <span className="text-[18px] text-green">
              <HiArrowNarrowRight />
            </span>
          </button>
        </motion.div>

        {/* Right Side Features */}
        <motion.div
          className="flex-1 flex flex-col space-y-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
            data-aos-delay={index * 100}
              className={`rounded-xl px-6 py-5.5 shadow-sm flex items-start gap-5 font-montserrat ${feature.bg}`}
            >
              <div
                className={`text-[18px] mt-1 p-1.5 flex justify-center items-center rounded-full ${feature.iconColor}`}
              >
                {feature.icon}
              </div>
              <div>
                <h3
                  className={`font-semibold text-[17px] mb-1 font-montserrat ${feature.textColor}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-[13px] ${feature.textColor} font-montserrat`}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
