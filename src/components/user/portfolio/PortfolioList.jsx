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
    <div className="relative w-full min-h-screen bg-user-smokewhite flex justify-center py-32">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      <div className="space-y-20 h-fit">
        <Particles
          className="absolute inset-0 z-0"
          quantity={500}
          ease={80}
          color={"#1e3a32"}
          refresh
        />
        <div className="flex justify-center items-center gap-7 md:gap-10 flex-wrap">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => onCategoryChange(category)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.08 }}
              className={`px-5 py-1.5 md:py-2 md:px-6 text-sm font-montserrat font-medium cursor-pointer transition-all duration-300 ${
                currentCategory === category
                  ? "bg-green text-white shadow-md scale-105 rounded-full"
                  : "text-green border-b-2 border-green"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 mx-auto">
          <AnimatePresence>
            {filteredPortfolios
              .slice(0, visibleCount)
              .map((portfolio, index) => (
                <motion.div
                  key={portfolio._id}
                  layout
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="relative h-[18rem] w-full max-w-[18rem] md:h-[22rem] md:max-w-[22rem] lg:h-[24rem] lg:max-w-[24rem] mx-auto cursor-pointer rounded-xl overflow-hidden bg-white group transition-transform duration-300 transform hover:scale-[1.03] border hover:shadow-green-300"
                  onClick={() => {
                    setSelectedMedia(portfolio);
                    setIsModalOpen(true);
                  }}
                >
                  {portfolio.type === "Video" ? (
                    <div className="relative w-full h-full">
                      <video
                        src={portfolio.secureUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <IoPlay
                          size={35}
                          className="text-white text-3xl bg-black/70 p-2 rounded-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">
                        <img
                          src={portfolio.secureUrl}
                          alt={portfolio.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <MdOutlineZoomOutMap
                            size={35}
                            className="text-white text-3xl bg-black/70 p-2 rounded-full"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-green/60 opacity-0 group-hover:opacity-60 transition-opacity duration-500 ease-in-out" />
                  <div className="absolute bottom-[-50px] left-0 w-full text-center text-white opacity-0 group-hover:bottom-6 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-lg font-semibold font-montserrat">
                      {portfolio.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {isModalOpen && selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen z-50 bg-green/90 flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full h-screen rounded-lg overflow-hidden"
              >
                {/* Top Actions */}
                <div className="absolute top-3 right-5 flex items-center justify-center gap-6 z-10">
                  <button
                    onClick={() => {
                      const elem = document.getElementById("fullscreen-media");
                      if (elem.requestFullscreen) elem.requestFullscreen();
                    }}
                    className="text-xl text-white hover:scale-110 transition cursor-pointer"
                  >
                    <FiMaximize2 />
                  </button>

                  <div className="relative" ref={shareRef}>
                    <button
                      onClick={() => setShowShareOptions((prev) => !prev)}
                      className="text-xl text-white hover:scale-110 transition cursor-pointer"
                    >
                      <FiShare2 />
                    </button>
                    {showShareOptions && (
                      <div className="absolute top-10 right-0 bg-white text-black rounded-md shadow-lg w-40 p-2 z-50 space-y-1">
                        <button
                          onClick={() =>
                            handleShareRedirect(
                              "whatsapp",
                              selectedMedia.secureUrl,
                              selectedMedia.title
                            )
                          }
                          className="w-full px-4 py-1 hover:bg-green-100 flex items-center justify-start gap-x-3 rounded-md"
                        >
                          <img className="w-[20px]" src={whatsappImg} alt="" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={() =>
                            handleShareRedirect(
                              "facebook",
                              selectedMedia.secureUrl,
                              selectedMedia.title
                            )
                          }
                          className="w-full px-4 py-1 hover:bg-green-100 flex items-center justify-start gap-x-3 rounded-md"
                        >
                          <img className="w-[20px]" src={facebookImg} alt="" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() =>
                            handleShareRedirect(
                              "linkedin",
                              selectedMedia.secureUrl,
                              selectedMedia.title
                            )
                          }
                          className="w-full px-4 py-1 hover:bg-green-100 flex items-center justify-start gap-x-3 rounded-md"
                        >
                          <img className="w-[20px]" src={linkedInImg} alt="" />
                          <span>LinkedIn</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleDownload(selectedMedia.secureUrl)}
                    className="text-xl text-white hover:scale-110 transition cursor-pointer"
                  >
                    <FiDownload />
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setShowShareOptions(false);
                    }}
                    className="text-xl text-white font-bold ml-2 hover:scale-110 transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-14 h-full">
                  {selectedMedia.type === "Video" ? (
                    <video
                      id="fullscreen-media"
                      src={selectedMedia.secureUrl}
                      controls
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      id="fullscreen-media"
                      src={selectedMedia.secureUrl}
                      alt={selectedMedia.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  )}
                  <p className="text-center mt-4 font-semibold text-lg text-white">
                    {selectedMedia.title}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {visibleCount < filteredPortfolios.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-green text-white rounded-full font-montserrat hover:scale-105 transition-transform"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
