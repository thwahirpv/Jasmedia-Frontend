import React from "react";
import { Particles } from "../../magicui/particles";
import photographyImg from "../../../assets/images/photography.png";
import videographyImg from "../../../assets/images/videography.png";
import brandingImg from "../../../assets/images/branding.png";
import motionDesign from "../../../assets/images/motionDesign.png";
import ScrollSection from "./ScrollSection";

const sections = [
  {
    id: 1,
    img: photographyImg,
    text: {
      title: "Commercial Photography",
      description: "We capture visuals that speak louder than words. From high-end product photography to corporate lifestyle shoots, our lens focuses on bringing out the authentic essence of your brand. We ensure every shot is meticulously composed to tell your unique story."
    },
  },
  {
    id: 2,
    img: videographyImg,
    text: {
      title: "Cinematic Videography",
      description: "Motion creates emotion. Our videography team crafts compelling narratives through dynamic visuals and professional editing. Whether it’s a brand commercial, event coverage, or social media content, we deliver cinematic experiences that captivate your audience."
    },
  },
  {
    id: 3,
    img: brandingImg,
    text: {
      title: "Strategic Branding",
      description: "Your brand is more than just a logo. We help build comprehensive identities that resonate. From visual systems to tone of voice, we design cohesive brand experiences that stand out in a crowded market and foster lasting customer loyalty."
    },
  },
  {
    id: 4,
    img: motionDesign,
    text: {
      title: "Motion Design & Animation",
      description: "Bring your ideas to life with fluid motion. Our motion graphics transform complex concepts into engaging visual stories. Perfect for explainers, social ads, and digital interfaces, we add that extra layer of dynamism to your communication."
    },
  },
];

const OurServices = () => {
  return (
    <div className="relative w-full bg-white">
      <div className="relative w-full flex flex-col justify-center items-center">
        <div className="relative w-full">
          {sections.map((section, index) => (
            <ScrollSection
              key={section.id}
              img={section.img}
              text={section.text}
              zIndex={sections.length + index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
