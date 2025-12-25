import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GetStartedNow = () => {
  return (
    <div className="relative w-full bg-user-white flex justify-center items-center py-32 overflow-hidden px-6">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-center items-center space-y-10 text-center max-w-4xl mx-auto">
        
        <h2
          className="text-4xl md:text-6xl font-russo font-bold text-agency-black leading-tight"
          data-aos="fade-up"
        >
          Ready to <span className="text-green">Elevate</span> <br /> Your Brand?
        </h2>
        
        <p 
          className="text-gray-600 font-opensans text-base md:text-lg max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
           Stop blending in. Let's build a digital presence that commands attention and drives real growth.
        </p>

        <div data-aos="fade-up" data-aos-delay="200">
           <Link to="/contact" className="group flex items-center gap-3 px-6 py-2.5 bg-agency-black text-white rounded-full font-bold text-base hover:bg-green hover:text-white transition-all duration-300 shadow-xl shadow-green/10">
             Start Your Project
             <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18}/>
           </Link>
        </div>

      </div>
    </div>
  );
};

export default GetStartedNow;
