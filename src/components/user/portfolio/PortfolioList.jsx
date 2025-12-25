import { getAllCategoryThunk } from "@/features/category/getAllCategory";
import { getAllPortfolioThunk } from "@/features/portfolio/getFullPortfolio";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IoPlay } from "react-icons/io5";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FiDownload, FiMaximize2, FiShare2 } from "react-icons/fi";
import whatsappImg from "../../../assets/images/whatsapp.png";
import facebookImg from "../../../assets/images/facebook.png";
import linkedInImg from "../../../assets/images/linkedin.png";
import { Particles } from "../../magicui/particles";
import { Play, ArrowRight } from "lucide-react";

const PortfolioList = () => {
  const [categories, setCategories] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const dispatch = useDispatch();
  const shareRef = useRef();
  const [visibleCount, setVisibleCount] = useState(6);

  const getAllPortfolio = async () => {
    try {
      const response = await dispatch(getAllPortfolioThunk()).unwrap();
      setPortfolios(response.data);
      setFilteredPortfolios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await dispatch(getAllCategoryThunk()).unwrap();
      setCategories(["All", ...response.category]);
    } catch (error) {
      console.log("front error: ", error);
    }
  };

  const onCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  useEffect(() => {
    getAllPortfolio();
    getAllCategory();
  }, []);

  useEffect(() => {
    if (currentCategory === "All") {
      setFilteredPortfolios(portfolios);
    } else {
      const filtered = portfolios.filter(
        (portfolio) => portfolio?.category?.name === currentCategory
      );
      setFilteredPortfolios(filtered);
    }
    setVisibleCount(6);
  }, [currentCategory, portfolios]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "media");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareRedirect = (platform, url, title) => {
    const encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(title);
    const shareLinks = {
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
    window.open(shareLinks[platform], "_blank");
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center py-20 px-6">
  
      <div className="w-full max-w-7xl space-y-16">
        
        {/* Categories */}
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => onCategoryChange(category)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 text-sm font-opensans font-bold rounded-full transition-all duration-300 border ${
                currentCategory === category
                  ? "bg-agency-black text-white border-agency-black shadow-lg"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredPortfolios
              .slice(0, visibleCount)
              .map((portfolio, index) => (
                <motion.div
                  key={portfolio._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl bg-white"
                  onClick={() => {
                    setSelectedMedia(portfolio);
                    setIsModalOpen(true);
                  }}
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
                    <div className="w-full h-full relative">
                        <img
                          src={portfolio.secureUrl}
                          alt={portfolio.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  
                  {/* Overlay Info */}
                   <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <h3 className="text-xl font-bold text-white mb-1 font-montserrat">
                      {portfolio.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-opensans">{portfolio?.category?.name}</p>
                  </div>
                  
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {visibleCount < filteredPortfolios.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-white border border-gray-200 text-agency-black font-bold rounded-full hover:bg-agency-black hover:text-white transition-all shadow-sm hover:shadow-lg"
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
             <div 
              className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
                {/* Actions Toolbar */}
                <div className="absolute top-0 right-0 flex items-center gap-4 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 z-20">
                     <button
                      onClick={() => {
                        const elem = document.getElementById("fullscreen-media");
                        if (elem.requestFullscreen) elem.requestFullscreen();
                      }}
                       className="text-white/80 hover:text-white hover:scale-110 transition"
                       title="Fullscreen"
                    >
                      <FiMaximize2 size={20} />
                    </button>
                    
                     <div className="relative" ref={shareRef}>
                        <button
                          onClick={() => setShowShareOptions(!showShareOptions)}
                          className="text-white/80 hover:text-white hover:scale-110 transition"
                          title="Share"
                        >
                          <FiShare2 size={20} />
                        </button>
                         {showShareOptions && (
                          <div className="absolute top-10 right-0 bg-white text-black rounded-xl shadow-xl overflow-hidden w-40 z-50">
                            {[
                                { name: "WhatsApp", icon: whatsappImg, platform: "whatsapp" },
                                { name: "Facebook", icon: facebookImg, platform: "facebook" },
                                { name: "LinkedIn", icon: linkedInImg, platform: "linkedin" }
                            ].map((item) => (
                                <button
                                  key={item.platform}
                                  onClick={() => handleShareRedirect(item.platform, selectedMedia.secureUrl, selectedMedia.title)}
                                  className="w-full px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-sm font-medium border-b border-gray-100 last:border-0"
                                >
                                  <img className="w-5" src={item.icon} alt={item.name} />
                                  {item.name}
                                </button>
                            ))}
                          </div>
                        )}
                     </div>

                    <button
                        onClick={() => handleDownload(selectedMedia.secureUrl)}
                        className="text-white/80 hover:text-white hover:scale-110 transition"
                        title="Download"
                      >
                        <FiDownload size={20} />
                    </button>

                     <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-white hover:text-red-400 hover:scale-110 transition"
                      title="Close"
                    >
                      ✕
                    </button>
                </div>

                {/* Media Content */}
                <div className="w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
                     {selectedMedia.type === "Video" ? (
                    <video
                      id="fullscreen-media"
                      src={selectedMedia.secureUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      id="fullscreen-media"
                      src={selectedMedia.secureUrl}
                      alt={selectedMedia.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Title Caption */}
                 <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white font-montserrat">{selectedMedia.title}</h3>
                    <p className="text-white/60 font-opensans mt-1">{selectedMedia.category?.name}</p>
                 </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
