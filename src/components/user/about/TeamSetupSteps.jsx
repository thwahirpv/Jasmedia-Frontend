import React from "react";
import { Particles } from "../../magicui/particles";
import { MessageSquare, FileText, Users } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Requirements Collection",
    description: "Scheduling a kick-off meeting to understand your goals.",
    icon: <MessageSquare size={32} />
  },
  {
    id: "02",
    title: "Business Proposal",
    description: "Creating a business proposal that matches your vision.",
    icon: <FileText size={32} />
  },
  {
    id: "03",
    title: "Dedicated Team Formation",
    description: "Gathering specialists with the most suitable skills.",
    icon: <Users size={32} />
  },
];

const TeamSetupSteps = () => {
  return (
    <section className="relative bg-white py-24 px-6 md:px-12">
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={50}
        color={"#0a0a0a"}
        refresh
      />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <div className="text-center">
             <h2 
                className="text-3xl md:text-4xl font-bold font-russo text-agency-black mb-4"
                data-aos="fade-up"
             >
                Our Process
             </h2>
             <p className="text-gray-500 font-opensans max-w-2xl mx-auto text-base md:text-lg">
                 How we organize our expertise to deliver your vision.
             </p>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-green hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-9xl font-bold font-russo text-agency-black">{step.id}</span>
              </div>
              
              <div className="relative z-10">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-agency-black group-hover:text-green transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-montserrat text-agency-black">{step.title}</h3>
                  <p className="text-gray-600 font-opensans leading-relaxed">
                    {step.description}
                  </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSetupSteps;
