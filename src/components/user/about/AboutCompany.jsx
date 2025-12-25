import React from 'react'
import { Particles } from '../../magicui/particles';
import { TextReveal } from '../../magicui/text-reveal';

const AboutCompany = () => {
  return (
    <section className="relative w-full min-h-[80vh] bg-white flex items-center justify-center px-6 py-24">
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={80}
        color={'#0a0a0a'}
        refresh
      />
      <div className="relative w-full max-w-6xl flex flex-col space-y-20 z-10">
        {/* Heading */}
        <div className="w-full flex items-center justify-center text-center">
            {/* Using a smaller font size for the reveal or different styling if possible to fit theme */}
           <div className="h-[200px] flex items-center justify-center">
             <TextReveal className="text-4xl md:text-5xl font-russo leading-relaxed text-center text-agency-black">
                Redefining Brands Through Creative Precision and Purposeful Innovation
              </TextReveal>
           </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center border-t border-gray-100 pt-12">
           <div className="text-left">
             <h3 className="text-2xl font-bold font-russo text-agency-black mb-4">Based in Canada, Global in Spirit.</h3>
              <p className="text-gray-600 font-opensans text-lg leading-relaxed">
               Jasmedia is a forward-thinking advertising agency driven by bold ideas and impactful storytelling. We don’t just follow trends—we shape them.
             </p>
           </div>

           <div className="text-left">
             <p className="text-gray-600 font-opensans text-lg leading-relaxed">
              Our team of creative strategists, designers, and media experts collaborates to build campaigns that don’t just attract attention—they build connection. 
              With a perfect blend of innovation, strategy, and artistic excellence, we help brands stand out in a competitive landscape. Whether you're launching, evolving, or reimagining your brand, we’re here to make every message matter.
            </p>
           </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany
