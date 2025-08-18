import React from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import linkedIn3D from '../../../assets/images/linkedin3D.png';
import whatsapp3D from '../../../assets/images/whatsapp3D.png';
import instagram3D from '../../../assets/images/instagram3D.png';
import { TextReveal } from "@/components/magicui/text-reveal";
import { Particles } from '../../magicui/particles';

const HomeAbout = () => {
  const DATA = {
    contact: {
      social: {
        Linkedin: {
          name: "Linkedin",
          url: "https://in.linkedin.com/",
          icon: linkedIn3D,
        },
        Instagram: {
          name: "Instagram",
          url: "https://www.instagram.com/",
          icon: instagram3D,
        },
        Whatsapp: {
          name: "Whatsapp",
          url: "https://www.whatsapp.com/",
          icon: whatsapp3D,
        },
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-[#f3f6f4] flex items-center justify-center px-6">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={'#1e3a32'}
        refresh
      />
      <div className="w-full max-w-7xl pt-[250px] pb-[200px] flex flex-col space-y-20">
        {/* Heading */}
        <div className="w-full flex items-center justify-center text-center">
          <TextReveal className="text-3xl font-russo leading-8 text-center max-w-6xl">
            Jasmedia is a creative advertising agency helping brands connect and grow.
          </TextReveal>
        </div>

        {/* Description and Socials */}
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center w-full gap-y-14 lg:gap-x-10 border-t border-[#AAB8B0] pt-12 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-10">
          {/* Socials */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center items-center space-y-6">
            <TooltipProvider>
              <Dock direction="middle">
                {Object.entries(DATA.contact.social).map(([name, social]) => (
                  <DockIcon key={name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={social.url}
                          aria-label={social.name}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-12 rounded-full"
                          )}
                        >
                          <img src={social.icon} className="w-[30px]" alt={name} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </DockIcon>
                ))}
              </Dock>
            </TooltipProvider>

            {/* Get in Touch Button */}
            <button
              className="px-6 py-3 rounded-full text-white bg-[#1E3D34] hover:bg-[#C6FF57] hover:text-[#1E3D34] transition-colors duration-300"
            >
              Get in Touch With Us
            </button>
          </div>

          {/* Description */}
          <div className="w-full lg:w-[60%] flex justify-center items-center">
            <p className="text-gray-950 text-center lg:text-left font-montserrat text-[16px] max-w-2xl mx-auto leading-8">
              We are a results-driven advertising agency focused on building real connections between brands and people.
              With a blend of strategic thinking and creative execution, we craft campaigns that not only look great but deliver measurable impact.
              Whether it’s digital, print, or social media, our team brings clarity, consistency, and purpose to every project —
              helping businesses grow with confidence and clarity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
