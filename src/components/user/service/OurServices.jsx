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
    text: `At JasMedia, we specialize in delivering stunning, high-quality photography 
    that brings your vision to life. From corporate branding and product showcases to real estate, 
    events, and lifestyle shoots, we create visuals that captivate and inspire. Our experienced team 
    ensures every detail is perfectly captured, whether it’s a wedding, a culinary masterpiece, or an 
    automotive highlight. With quick turnarounds and a passion for excellence, JasMedia transforms moments 
    into powerful visual stories tailored to your brand and goals.`,
  },
  {
    id: 1,
    img: videographyImg,
    text: `At JasMedia, we specialize in delivering stunning, high-quality photography 
    that brings your vision to life. From corporate branding and product showcases to real estate, 
    events, and lifestyle shoots, we create visuals that captivate and inspire. Our experienced team 
    ensures every detail is perfectly captured, whether it’s a wedding, a culinary masterpiece, or an 
    automotive highlight. With quick turnarounds and a passion for excellence, JasMedia transforms moments 
    into powerful visual stories tailored to your brand and goals.`,
  },
  {
    id: 1,
    img: brandingImg,
    text: `At JasMedia, we specialize in delivering stunning, high-quality photography 
    that brings your vision to life. From corporate branding and product showcases to real estate, 
    events, and lifestyle shoots, we create visuals that captivate and inspire. Our experienced team 
    ensures every detail is perfectly captured, whether it’s a wedding, a culinary masterpiece, or an 
    automotive highlight. With quick turnarounds and a passion for excellence, JasMedia transforms moments 
    into powerful visual stories tailored to your brand and goals.`,
  },
  {
    id: 1,
    img: motionDesign,
    text: `At JasMedia, we specialize in delivering stunning, high-quality photography 
    that brings your vision to life. From corporate branding and product showcases to real estate, 
    events, and lifestyle shoots, we create visuals that captivate and inspire. Our experienced team 
    ensures every detail is perfectly captured, whether it’s a wedding, a culinary masterpiece, or an 
    automotive highlight. With quick turnarounds and a passion for excellence, JasMedia transforms moments 
    into powerful visual stories tailored to your brand and goals.`,
  },
];

const OurServices = () => {
  return (
    <div className="relative w-full bg-user-smokewhite py-32 px-6">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={"#1e3a32"}
        refresh
      />

      <div className="relative w-full flex flex-col justify-center items-center">
        {/* <h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 font-russo"
          data-aos="fade-up"
        >
          Our Services
        </h2> */}

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
