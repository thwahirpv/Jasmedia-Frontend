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
      className="sticky bg-user-smokewhite h-screen top-0 w-full flex flex-col md:flex-row items-center justify-between gap-10 px-6"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <motion.img
          src={img}
          alt=""
          className="w-xs lg:w-sm rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Text */}
      <div className="w-full md:w-1/2 flex justify-start items-center max-h-[50vh] overflow-y-auto px-2">
        <motion.p
        className="text-gray-950 text-center md:text-left font-montserrat text-lg max-w-xl leading-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {text}
      </motion.p>
      </div>
    </motion.div>
  );
};

export default ScrollSection;
