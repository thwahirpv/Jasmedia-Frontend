import React from "react";
import { motion } from "motion/react";
import { Particles } from "@/components/magicui/particles";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactIntro = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-white overflow-hidden pt-20">
      
       <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0"
            quantity={80}
            staticity={50}
            color="#0a0a0a" 
            ease={50}
          />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs md:text-sm font-bold uppercase tracking-wider"
        >
          Get In Touch
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-russo text-agency-black leading-tight max-w-4xl"
        >
          Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-600">Conversation.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-base md:text-lg text-gray-600 font-opensans leading-relaxed"
        >
           Ready to transform your brand? We're here to help you achieve your goals. Reach out to us today.
        </motion.p>
        
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center gap-3"
            >
                <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green">
                   <Mail size={20} />
                </div>
                <h3 className="font-bold text-agency-black font-montserrat">Email Us</h3>
                <p className="text-sm text-gray-500 font-opensans">contact@jasmedia.co</p>
            </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center gap-3"
            >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                   <Phone size={20} />
                </div>
                <h3 className="font-bold text-agency-black font-montserrat">Call Us</h3>
                <p className="text-sm text-gray-500 font-opensans">+1 (548) 333-2232</p>
            </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.7 }}
               className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center gap-3"
            >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                   <MapPin size={20} />
                </div>
                <h3 className="font-bold text-agency-black font-montserrat">Visit Us</h3>
                <p className="text-sm text-gray-500 font-opensans text-center">Suite 841 40914 Bernhard Locks,<br/> West Claribelberg, OR</p>
            </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactIntro;
