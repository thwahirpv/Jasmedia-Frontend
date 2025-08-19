import React from "react";
import founderIMG from "../../../assets/images/founder.webp";
import managerIMG from "../../../assets/images/manager.jpeg";
import { Particles } from "../../magicui/particles";

const TeamMembers = () => {
  const memberData = [
    {
      name: "Jhone",
      profile: founderIMG,
      position: "Founder",
    },
    {
      name: "Thomas",
      profile: managerIMG,
      position: "Manager",
    },
  ];
  return (
    <div className="relative w-full flex flex-col bg-user-smokewhite justify-center items-center py-28 space-y-14">
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      <h1
        className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 font-russo text-center"
        data-aos="fade-up"
      >
        Team Members
      </h1>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
        {memberData.map((member, index) => (
          <div className="bg-green rounded-xl pb-2" data-aos="fade-up" key={index}>
            <div className="w-[220px] h-[220px] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img
                src={member.profile}
                alt="Team Member"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-user-white font-montserrat">
                {member.name}
              </h3>
              <p className="text-sm text-user-gray-100 font-montserrat">
                {member.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
