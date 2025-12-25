import React from 'react'
import HomeIntro from '../../components/user/home/HomeIntro'
import HomeAbout from '@/components/user/home/HomeAbout'
import WhyChooseUs from '@/components/user/home/WhyChooseUs'
import Projects from '@/components/user/home/Projects'
import Testimonial from '@/components/user/common/Testimonial'
import Footer from '@/components/user/common/Footer'
import LoadingScreen from '@/components/user/common/LoadingScreen'


const Home = () => {
  return (
    <div>
      <HomeIntro />
      <HomeAbout />
      <WhyChooseUs />
      <Projects />
      <Testimonial />
    </div>
  
  )
}

export default Home
