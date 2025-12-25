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
import { ArrowUpRight } from 'lucide-react';

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
    <section className="relative w-full py-24 lg:py-32 bg-user-white px-6">
      
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Main Statement - Big & Bold */}
        <div className="w-full text-center">
            <h2 className="text-3xl md:text-5xl font-russo text-agency-black leading-tight max-w-5xl mx-auto">
              We help brands <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-500">connect</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-500">grow.</span>
            </h2>
        </div>

        {/* Content Split */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Socials */}
          <div className="flex flex-col items-center lg:items-start space-y-8 order-2 lg:order-1">
             <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 w-full max-w-md flex flex-col items-center shadow-lg shadow-gray-100/50">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Connect With Us</p>
                <TooltipProvider>
                  <Dock direction="middle" className="bg-white rounded-full border border-gray-200 p-2 shadow-sm">
                    {Object.entries(DATA.contact.social).map(([name, social]) => (
                      <DockIcon key={name} className="size-14">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={social.url}
                              aria-label={social.name}
                              className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "size-12 rounded-full hover:bg-gray-100"
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

                <Link
                  to="/contact"
                  className="mt-8 flex items-center gap-2 text-agency-black font-bold text-lg group hover:text-green transition-colors"
                >
                  Get in Touch <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
             </div>
          </div>

          {/* Right: Narrative */}
          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl font-bold font-russo text-gray-900 border-l-4 border-green pl-4">
              More than just an agency.
            </h3>
            <p className="text-lg text-gray-600 font-opensans leading-relaxed">
              We are a results-driven advertising agency focused on building real connections between brands and people.
              With a blend of strategic thinking and creative execution, we craft campaigns that not only look great but deliver measurable impact.
            </p>
            <p className="text-lg text-gray-600 font-opensans leading-relaxed">
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
