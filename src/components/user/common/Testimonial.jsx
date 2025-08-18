import { getAllFeedbackThunk } from '@/features/feedback/getAllFeedback';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
    <div className="relative w-full px-6 overflow-hidden py-16 bg-gray-50 space-y-28">
      {/* <Particles
        className="absolute z-0"
        quantity={300}
        ease={80}
        color={"#1e3a32"}
        refresh
      /> */}
      <h1 
      data-aos="fade-up"
      data-aos-delay={1 * 100}
      className="text-center font-russo text-gray-900 text-4xl font-bold">
        Our Happy Clients
      </h1>

      {/* Swiper */}
      <Swiper
        data-aos="fade-left"
        data-aos-delay={3 * 100}
        modules={[Autoplay, Navigation]}
        loop={true}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative px-6 rounded-xl overflow-hidden"
      >
        {testimonials.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <div className="h-60 p-6 mb-1.5 bg-[#F2FFF5] shadow-lg rounded-xl overflow-hidden flex flex-col justify-between">
              <h3 className="text-[15px] font-semibold text-[#1E3D34] font-montserrat leading-relaxed">
                “{testimonial.feedback}”
              </h3>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-semibold font-montserrat text-[#e58952]">
                  {testimonial.name}
                </p>
                <p className="italic font-montserrat text-gray-700">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute z-10 left-4 top-1/2 -translate-y-1/2 bg-white p-1 md:p-2  rounded-full shadow hover:bg-gray-100"
        >
          <FiChevronLeft size={22} />
        </button>
        <button
          ref={nextRef}
          className="absolute z-10 right-4 top-1/2 -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow hover:bg-gray-100"
        >
          <FiChevronRight size={24} />
        </button>
      </Swiper>
    </div>
  );
};

export default Testimonial;
