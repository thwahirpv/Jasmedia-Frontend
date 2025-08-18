import React, { useEffect } from "react";
import { motion, useAnimation } from "motion/react";

const FloatingDot = ({position, color, size}) => {
  const controls = useAnimation();

  useEffect(() => {
    const animate = () => {
      controls
        .start({
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        })
        .then(animate);
    };
    animate();
  }, [controls]);
  return (
    <motion.div
      animate={controls}
      className={`absolute ${position} ${color} ${size} rounded-full`}
    />
  )
};

export default FloatingDot;
