import React from "react";
import founderIMG from "../../../assets/images/founder.webp";
import managerIMG from "../../../assets/images/manager.jpeg";
import { Particles } from "@/components/magicui/particles";

const TeamMembers = () => {
  const memberData = [
    {
      name: "Jhone Doe",
      profile: founderIMG,
      position: "Founder & CEO",
    },
    {
      name: "Thomas Smith",
      profile: managerIMG,
      position: "Creative Director",
    },
     // Added more placeholders if needed or stick to 2
  ];
  return (
    <section className="relative w-full bg-user-white py-24 px-6">
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={50}
        color={"#0a0a0a"}
        refresh
      />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center">
             <h2 
                className="text-3xl md:text-4xl font-bold font-russo text-agency-black mb-4"
                data-aos="fade-up"
             >
                Meet The Team
             </h2>
             <p className="text-gray-500 font-opensans"
                data-aos="fade-up"
             >
                 The creative minds behind the magic.
             </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {memberData.map((member, index) => (
            <div 
                className="group relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                key={index}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={member.profile}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent pt-20">
                <h3 className="text-2xl font-bold text-white font-russo">
                  {member.name}
                </h3>
                <p className="text-white font-medium font-montserrat">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
