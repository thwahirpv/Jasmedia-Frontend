import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { latestPortfolioThunk } from '@/features/portfolio/latestPortfolio';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

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
    <section className="relative w-full py-24 bg-white flex flex-col justify-center items-center gap-y-16 px-6">
      
      {/* Title */}
      <div className="w-full flex flex-col items-center text-center gap-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs font-bold uppercase tracking-wider"
        >
          Featured Work
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold font-russo text-agency-black"
        >
          Selected Projects
        </motion.h2>
      </div>

      {/* Portfolio Cards */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPortfolio.map((portfolio, index) => (
            <motion.div
              key={portfolio._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {portfolio.type === "Video" ? (
                <div className="relative w-full h-full">
                   <video
                    src={portfolio.secureUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                     <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                        <Play size={20} fill="currentColor" />
                     </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <img
                    src={portfolio.secureUrl}
                    alt={portfolio.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-1 font-montserrat">
                  {portfolio.title}
                </h3>
                <p className="text-sm text-gray-300 font-opensans line-clamp-1">{portfolio.description || "Digital Marketing Campaign"}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <div className="w-full flex justify-center mt-16">
          <Link to="/portfolio" className="group flex items-center gap-2 px-5 py-2 bg-white text-agency-black border border-gray-200 rounded-full font-bold text-sm hover:bg-agency-black hover:text-white transition-all duration-300 shadow-sm">
             View All Projects
             <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
           </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
