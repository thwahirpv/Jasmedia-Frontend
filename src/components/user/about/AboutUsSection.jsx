import React from "react";
import { Eye, Target, Hand, ShieldCheck } from "lucide-react";
import { Particles } from "@/components/magicui/particles";

const items = [
  {
    icon: <Eye className="w-8 h-8 text-green" />,
    title: "Vision",
    description:
      "To be a leading creative force in the advertising industry, recognized globally for our innovative solutions and impactful storytelling. We envision a future where brands communicate authentically.",
  },
  {
    icon: <Target className="w-8 h-8 text-blue-600" />,
    title: "Mission",
    description:
      "To empower brands with creative strategies that captivate, inspire, and deliver real business results through thoughtful storytelling and innovation.",
  },
  {
    icon: <Hand className="w-8 h-8 text-orange-500" />,
    title: "We Aim To",
    description:
      "Bridge the gap between imagination and execution, ensuring every project reflects our clients' core identity while pushing creative boundaries.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
    title: "Core Values",
    description:
      "Creativity, Integrity, Collaboration, and Innovation. These values guide every decision we make and every story we tell.",
  },
];

const AboutUsSection = () => {
  return (
    <section className="relative bg-gray-50 py-24 px-6 md:px-12">
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={50}
        color={"#0a0a0a"}
        refresh
      />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-agency-black font-russo"
          data-aos="fade-up"
        >
          Who We Are
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-green/10 transition-colors"
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-russo text-agency-black mb-3 group-hover:text-green transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm font-opensans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
 