"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaIndustry, FaImage } from "react-icons/fa";
import { RiVipDiamondFill } from "react-icons/ri";
import { ArrowRight } from "lucide-react";


const features = [
  {
    title: "Fully Managed",
    description: "We handle everything — from updates to security — so you can focus on growing.",
    icon: <FaCheckCircle />,
    bg: "bg-white",
    textColor: 'text-gray-800',
    iconColor: 'bg-green/10 text-green'
  },
  {
    title: "Saves Time",
    description: "Free up to 10+ hours monthly you'd otherwise spend on managing campaigns.",
    icon: <FaClock />,
    bg: "bg-white",
    textColor: 'text-gray-800',
    iconColor: 'bg-blue-50 text-blue-600'
  },
  {
    title: "Agency Tailored",
    description: "Optimized solutions crafted especially for creative and ad-focused businesses.",
    icon: <FaIndustry />,
    bg: "bg-white",
    textColor: 'text-gray-800',
    iconColor: 'bg-purple-50 text-purple-600'
  },
  {
    title: "Premium Identity",
    description: "Elevate your image with sleek design aligned to premium standards.",
    icon: <FaImage />,
    bg: "bg-white",
    textColor: 'text-gray-800',
    iconColor: 'bg-orange-50 text-orange-600'
  },
];


const WhyChooseUs = () => {
  return (
    <section className="relative w-full py-24 bg-gray-50 flex items-center px-6">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-16">
        
        {/* Left Side Text */}
        <motion.div
           whileInView={{ opacity: 1, x: 0 }}
           initial={{ opacity: 0, x: -50 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="flex-1 max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
             <RiVipDiamondFill size={14} /> Why Us
          </div>
          
          <h2 className="text-3xl md:text-4xl font-russo font-bold text-agency-black leading-tight mb-6">
            Why choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Jasmedia</span>?
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg font-opensans leading-relaxed mb-8">
            We empower creative professionals and agencies with premium
            advertising solutions — no technical headaches, just results.
          </p>
          
          <button className="group px-5 py-2 flex items-center gap-3 bg-agency-black text-white rounded-full font-bold text-sm transition-all hover:bg-green shadow-lg">
            Get started now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </button>
        </motion.div>

        {/* Right Side Features */}
        <motion.div
           whileInView={{ opacity: 1, x: 0 }}
           initial={{ opacity: 0, x: 50 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="flex-1 w-full grid sm:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 ${feature.bg}`}
            >
              <div
                className={`w-12 h-12 flex justify-center items-center rounded-2xl text-xl ${feature.iconColor}`}
              >
                {feature.icon}
              </div>
              <div>
                <h3
                  className={`font-bold text-lg mb-2 font-montserrat ${feature.textColor}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm text-gray-500 font-opensans leading-relaxed`}
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
