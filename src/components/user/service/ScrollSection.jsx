import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "@/components/magicui/particles";

const ScrollSection = ({ img, text, zIndex }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], 
  });


  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, zIndex }}
      className="sticky bg-white h-screen top-0 w-full flex flex-col md:flex-row items-center justify-center gap-10 px-6"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={"#0a0a0a"}
        refresh
      />
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <motion.img
          src={img}
          alt=""
          className="w-full max-w-lg rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Text */}
      <div className="w-full md:w-1/2 flex justify-start items-center">
        <div className="max-w-xl">
           <motion.h3
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="text-3xl md:text-4xl font-bold font-russo text-agency-black mb-6"
           >
             {text.title || "Our Expertise"}
           </motion.h3>
           <motion.p
            className="text-gray-600 md:text-left font-opensans text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {text.description || text}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollSection;
