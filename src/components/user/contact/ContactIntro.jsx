import React from "react";
import { RiVipDiamondFill } from "react-icons/ri";
import { TextAnimate } from "../../magicui/text-animate";
import { motion } from "motion/react";
import FloatingDot from "../common/FloatingDot";
import megaphone from "../../../assets/images/megaphone.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import linkedIn3D from "../../../assets/images/linkedin3D.png";
import whatsapp3D from "../../../assets/images/whatsapp3D.png";
import instagram3D from "../../../assets/images/instagram3D.png";
import gmail3D from "../../../assets/images/gmail3D.png";
import { ShinyButton } from "../../magicui/shiny-button";
import gpsIcon from '../../../assets/images/gps.png'

const ContactIntro = () => {
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
        email: {
          name: "E-Mail",
          url: "https://mail.google.com/mail/?view=cm&fs=1&to=contact@jasmedia.co",
          icon: gmail3D,
        },
      },
    },
  };
  return (
    <div className="relative w-full h-screen bg-green flex justify-center">
      <div className="mt-[160px] space-y-[50px] transition-all">
        <div className="px-4">
          <p className="text-user-pale text-[11px] flex items-center justify-center text-center mb-6">
            <span className="mr-2">
              <RiVipDiamondFill />
            </span>
            Contact Us
          </p>
          <TextAnimate
            duration={0.4}
            animation="fadeIn"
            by="line"
            as="h1"
            className="text-xl md:text-3xl font-bold font-russo text-center text-white leading-relaxed max-w-2xl mx-auto"
          >
            Ready to elevate your brand? Get in touch with us today!
          </TextAnimate>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <span>
            <img className="w-[30px]" src={gpsIcon} alt="" />
          </span>
          <TextAnimate
            duration={0.4}
            animation="fadeIn"
            by="line"
            as="h1"
            className="text-sm font-montserrat text-center text-white leading-relaxed max-w-2xs md:max-w-2xl"
          >
            Suite 841 40914 Bernhard Locks, West Claribelberg, OR 22657-4100
          </TextAnimate>
        </div>

        <div className="px-5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <ShinyButton className="text-user-white">
              +1 (548) 333-2232
            </ShinyButton>
            <ShinyButton className="text-user-white">
              +1 (647) 507-5256
            </ShinyButton>
            <ShinyButton className="text-user-white">
              +1 (647) 409-6548
            </ShinyButton>
          </div>
          <div>
            <TooltipProvider>
              <Dock direction="middle">
                {Object.entries(DATA.contact.social).map(([name, social]) => (
                  <DockIcon key={name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-12 rounded-full"
                          )}
                        >
                          <img
                            src={social.icon}
                            className="w-[30px]"
                            alt={name}
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </DockIcon>
                ))}
              </Dock>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <motion.img
        className="absolute top-[9%] md:top-[6%] lg:top-[11%] left-[12%] md:left-[10%] lg:left-[14%] w-auto h-[50px] rotate-[35deg]"
        src={megaphone}
        alt=""
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <FloatingDot
        position="top-[15%] right-[12%] translate-x-[50%] translate-y-[-50%]"
        color="bg-user-pale"
        size="p-1.5"
      />
      <FloatingDot
        position="bottom-[30%] left-[10%] translate-x-[-20%] translate-y-[30%]"
        color="bg-[#d99868]"
        size="p-1"
      />
    </div>
  );
};

export default ContactIntro;
