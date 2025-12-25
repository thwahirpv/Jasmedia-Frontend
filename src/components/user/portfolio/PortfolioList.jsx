import { getAllCategoryThunk } from "@/features/category/getAllCategory";
import { getAllPortfolioThunk } from "@/features/portfolio/getFullPortfolio";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
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
    <div className="relative w-full min-h-screen bg-user-white flex justify-center py-20 px-6">
  
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
        {/* Modal */}
        {isModalOpen && selectedMedia && ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen z-[9999] bg-agency-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
             <div 
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#1a1a1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
                {/* Header / Actions */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex items-center gap-2 md:gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
                     <button
                      onClick={() => {
                        const elem = document.getElementById("fullscreen-media");
                        if (elem.requestFullscreen) elem.requestFullscreen();
                      }}
                       className="p-1.5 md:p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                       title="Fullscreen"
                    >
                      <FiMaximize2 size={18} />
                    </button>
                    
                     <div className="relative" ref={shareRef}>
                        <button
                          onClick={() => setShowShareOptions(!showShareOptions)}
                          className="p-1.5 md:p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                          title="Share"
                        >
                          <FiShare2 size={18} />
                        </button>
                         {showShareOptions && (
                          <div className="absolute top-12 right-0 bg-[#0f0f0f] border border-white/10 text-white rounded-xl shadow-xl overflow-hidden w-40 z-50">
                            {[
                                { name: "WhatsApp", icon: whatsappImg, platform: "whatsapp" },
                                { name: "Facebook", icon: facebookImg, platform: "facebook" },
                                { name: "LinkedIn", icon: linkedInImg, platform: "linkedin" }
                            ].map((item) => (
                                <button
                                  key={item.platform}
                                  onClick={() => handleShareRedirect(item.platform, selectedMedia.secureUrl, selectedMedia.title)}
                                  className="w-full px-4 py-3 hover:bg-white/5 flex items-center gap-3 text-sm font-medium border-b border-white/5 last:border-0"
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
                        className="p-1.5 md:p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        title="Download"
                      >
                        <FiDownload size={18} />
                    </button>

                     <div className="w-px h-4 md:h-6 bg-white/20 mx-1"></div>

                     <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-1.5 md:p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                      title="Close"
                    >
                      ✕
                    </button>
                </div>

                {/* Scrollable Content Container */}
                <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent h-full">
                    {/* Media Content */}
                    <div className="w-full bg-black/40 flex items-center justify-center p-2 min-h-[250px] md:min-h-[400px]">
                         {selectedMedia.type === "Video" ? (
                        <video
                          id="fullscreen-media"
                          src={selectedMedia.secureUrl}
                          controls
                          autoPlay
                          className="w-full h-full max-h-[55vh] object-contain rounded-xl"
                        />
                      ) : (
                        <img
                          id="fullscreen-media"
                          src={selectedMedia.secureUrl}
                          alt={selectedMedia.title}
                          className="w-full h-full max-h-[55vh] object-contain rounded-xl shadow-lg"
                        />
                      )}
                    </div>

                    {/* Content Details */}
                     <div className="p-8 md:p-10 w-full bg-[#1a1a1a]">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8 border-b border-white/10 pb-6">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white font-russo tracking-wide mb-2">{selectedMedia.title}</h3>
                                    <span className="inline-block px-3 py-1 bg-white/5 text-green-400 text-sm font-bold rounded-lg border border-white/5">
                                        {selectedMedia.category?.name}
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                   {/* Placeholder for future action buttons if needed */}
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-lg font-bold text-white font-russo opacity-80">About Project</h4>
                                <p className="text-gray-300 font-opensans leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                                    {selectedMedia.description || "No description available for this project."}
                                </p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
          </motion.div>,
          document.body
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
