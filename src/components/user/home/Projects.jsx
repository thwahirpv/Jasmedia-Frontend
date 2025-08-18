import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { latestPortfolioThunk } from '@/features/portfolio/latestPortfolio';
import { motion } from "motion/react";
import { Particles } from '../../magicui/particles';
import { NavLink } from 'react-router-dom';

const Projects = () => {
  const [latestPortfolio, setLatestPortfolio] = useState([]);
  const dispatch = useDispatch();

  const fetchLatestPortfolio = async () => {
    try {
      const response = await dispatch(latestPortfolioThunk()).unwrap();
      setLatestPortfolio(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestPortfolio();
  }, []);

  return (
    <section className="relative w-full flex flex-col justify-center items-center bg-[#f3f6f4] px-6 py-24 gap-y-24">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-gray-900 px-6 py-2 rounded-xl font-russo text-center">
          Our Projects
        </h2>
      </motion.div>

      {/* Portfolio Cards */}
      <div className="w-full flex flex-col gap-y-14 justify-center items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 mx-auto">
          {latestPortfolio.map((portfolio, index) => (
            <motion.div
              key={portfolio._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative h-[18rem] w-full max-w-[18rem] md:h-[22rem] md:max-w-[22rem] lg:h-[24rem] lg:max-w-[24rem] mx-auto cursor-pointer rounded-xl overflow-hidden bg-white group transition-transform duration-300 transform hover:scale-[1.03] border hover:shadow-green-300"
            >
              {portfolio.type === "Video" ? (
                <video
                  src={portfolio.secureUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <>
                  <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">
                    <img
                      src={portfolio.secureUrl}
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-green bg-opacity-60 opacity-0 group-hover:opacity-60 transition-opacity duration-500 ease-in-out" />
                  <div className="absolute bottom-[-50px] left-0 w-full text-center text-white opacity-0 group-hover:bottom-6 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-lg font-semibold font-montserrat">
                      {portfolio.title}
                    </h3>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <button className="w-fit mt-6 px-7 py-2 flex items-center font-montserrat cursor-pointer justify-center gap-2 bg-green text-user-gray-50 rounded-full text-sm font-medium transition-all duration-300 shadow-md">
          <NavLink to="/portfolio">
            See More
          </NavLink>
        </button>
      </div>
    </section>
  );
};

export default Projects;
