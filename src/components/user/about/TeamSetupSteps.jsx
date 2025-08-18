import React from "react";
import { Particles } from "../../magicui/particles";

const steps = [
  {
    id: 1,
    title: "Requirements Collection",
    description: "Scheduling a kick-off meeting to understand your goals.",
    hoverBg: "hover:bg-orange-500",
    border: "border-orange-500",
    textColor: "text-orange-500"
  },
  {
    id: 2,
    title: "Business Proposal",
    description: "Creating a business proposal that matches your vision.",
    hoverBg: "hover:bg-blue-500",
    border: "border-blue-500",
    textColor: 'text-blue-500'
  },
  {
    id: 3,
    title: "Dedicated Team Formation",
    description: "Gathering specialists with the most suitable skills.",
    hoverBg: "hover:bg-purple-500",
    border: "border-purple-500",
    textColor: 'text-purple-500'
  },
];

const TeamSetupSteps = () => {
  return (
    <section className="relative bg-user-smokewhite py-24 px-6 mt-10 md:px-10 lg:px-20 space-y-20">
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={"#1e3a32"}
        refresh
      />

      <div className="max-w-6xl mx-auto text-center">
        <h2 
        className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 font-russo text-center"
        data-aos="fade-up">
          How we set up <br className="md:hidden" /> our teams
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`border ${step.border} rounded-lg p-8 transition-all duration-300 ease-in-out ${step.hoverBg} group`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="text-5xl font-bold mb-4 group-hover:text-white">{step.id}</div>
            <h3 className={`text-xl font-semibold mb-2 font-montserrat ${step.textColor} group-hover:text-white`}>{step.title}</h3>
            <p className="text-sm text-user-gray-900 group-hover:text-white font-montserrat">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSetupSteps;
