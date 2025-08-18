import React from 'react'
import { Particles } from '../../magicui/particles';
import { TextReveal } from '../../magicui/text-reveal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Dock, DockIcon, Link } from 'lucide-react';
import linkedIn3D from '../../../assets/images/linkedin3D.png';
import whatsapp3D from '../../../assets/images/whatsapp3D.png';
import instagram3D from '../../../assets/images/instagram3D.png';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../../ui/button';

const AboutCompany = () => {
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
    <section className="relative w-full min-h-screen bg-user-smokewhite flex items-center justify-center px-6">
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
          <TextReveal className="text-3xl font-russo leading-relaxed text-center max-w-5xl">
            Redefining Brands Through Creative Precision and Purposeful Innovation
          </TextReveal>
        </div>
        <div className="flex justify-center items-center w-full border-t border-[#AAB8B0] pt-12 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-10">
          {/* Description */}
          <div className="w-full lg:w-[60%] flex justify-center items-center">
            <p className="text-gray-950 text-center font-montserrat text-[16px] max-w-2xl mx-auto leading-8">
              Based in Canada, Jasmedia is a forward-thinking advertising agency driven by bold ideas and 
              impactful storytelling. Our team of creative strategists, designers, and media experts collaborates 
              to build campaigns that don’t just attract attention — they build connection. With a perfect blend of 
              innovation, strategy, and artistic excellence, we help brands stand out in a competitive landscape. At Jasmedia, 
              we don’t follow trends — we shape them. Whether you're launching, evolving, or reimagining your brand, 
              we’re here to make every message matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany
