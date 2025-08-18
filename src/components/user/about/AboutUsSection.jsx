import React from "react";
import { Eye, Target, Hand, ShieldCheck } from "lucide-react";
import { Particles } from "../../magicui/particles";

const items = [
  {
    icon: <Eye className="w-7 h-7 text-green-400" />,
    title: "Vision",
    description:
      "To be a leading creative force in the advertising industry, recognized globally for our innovative solutions and impactful storytelling. We envision a future where brands communicate authentically and connect meaningfully with their audiences.",
    borderColor: 'border-green-400',
    textColor: 'text-green-400'
  },
  {
    icon: <Target className="w-7 h-7 text-blue-400" />,
    title: "Mission",
    description:
      "To empower brands with creative strategies that captivate, inspire, and deliver real business results through thoughtful storytelling and innovation.",
    borderColor: 'border-blue-400',
  },
  {
    icon: <Hand className="w-7 h-7 text-[#e58952]" />,
    title: "We Aim To",
    description:
      "Bridge the gap between imagination and execution, ensuring every project reflects our clients' core identity while pushing creative boundaries.",
    borderColor: 'border-[#e58952]',
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-user-pale" />,
    title: "Core Values",
    description:
      "Creativity, Integrity, Collaboration, and Innovation. These values guide every decision we make and every story we tell.",
    borderColor: 'border-user-pale',
  },
];

const AboutUsSection = () => {
  return (
    <section className="relative bg-user-smokewhite py-24 px-6 md:px-12">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      <div className="max-w-4xl mx-auto space-y-24">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 font-russo"
          data-aos="fade-up"
        >
          Who We Are
        </h2>
        <div className="relative border-l border-gray-900 pl-6 space-y-12">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className={`absolute -left-5 top-1 bg-green rounded-full border ${item.borderColor} p-1.5`}
              >
                {item.icon}
              </div>
              <div className="bg-green rounded-xl p-7 border border-gray-700 hover:border-green-400 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-montserrat font-semibold mb-2 text-user-smokewhite">
                  {item.title}
                </h3>
                <p className="text-user-gray-100 text-sm font-montserrat">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
 