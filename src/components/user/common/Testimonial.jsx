import { getAllFeedbackThunk } from '@/features/feedback/getAllFeedback';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Quote } from 'lucide-react';
import { Particles } from "@/components/magicui/particles";

import 'swiper/css';
import 'swiper/css/navigation';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const dispatch = useDispatch();

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchAllFeedback = async () => {
      try {
        const response = await dispatch(getAllFeedbackThunk()).unwrap();
        setTestimonials(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllFeedback();
  }, [dispatch]);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.navigation &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [testimonials]);

  return (
    <section className="relative w-full px-6 overflow-hidden py-24 bg-white space-y-16">
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={50}
        color={"#0a0a0a"}
        refresh
      />
      
      <div className="relative z-10 text-center space-y-4">
           <h2 
            className="text-3xl md:text-4xl font-bold font-russo text-agency-black"
            data-aos="fade-up"
           >
            Client Stories
          </h2>
          <p className="text-gray-500 font-opensans max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
             See what our partners have to say about working with us.
          </p>
      </div>

      {/* Swiper */}
      <div className="max-w-7xl mx-auto relative px-8">
        <Swiper
            data-aos="fade-up"
            data-aos-delay={200}
            modules={[Autoplay, Navigation]}
            loop={true}
            spaceBetween={30}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
            swiperRef.current = swiper;
            }}
            breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            }}
            className="rounded-xl !overflow-visible"
        >
            {testimonials.map((testimonial, i) => (
            <SwiperSlide key={i} className="h-full">
                <div className="h-full min-h-[300px] p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-green hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                    <div>
                        <Quote className="w-10 h-10 text-gray-200 group-hover:text-green/20 mb-4 transition-colors" />
                        <h3 className="text-lg font-medium text- agency-black font-opensans leading-relaxed italic opacity-80">
                            "{testimonial.feedback}"
                        </h3>
                    </div>
                    
                    <div className="mt-8 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-agency-black text-white flex items-center justify-center font-bold font-russo">
                             {testimonial.name.charAt(0)}
                         </div>
                         <div>
                            <p className="font-bold font-montserrat text-agency-black text-sm">
                                {testimonial.name}
                            </p>
                            <p className="text-xs text-gray-500 font-montserrat uppercase tracking-wider">
                                {testimonial.role}
                            </p>
                         </div>
                    </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        
        {/* Custom Navigation Buttons - Absolute positioned outside swiper if possible, or inside container */}
        <button
          ref={prevRef}
          className="absolute z-20 left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-4 bg-white border border-gray-200 p-3 rounded-full shadow-lg text-agency-black hover:bg-agency-black hover:text-white transition-all duration-300"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          ref={nextRef}
          className="absolute z-20 right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-4 bg-white border border-gray-200 p-3 rounded-full shadow-lg text-agency-black hover:bg-agency-black hover:text-white transition-all duration-300"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

    </section>
  );
};

export default Testimonial;
