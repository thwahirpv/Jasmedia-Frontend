import Footer from '@/components/user/common/Footer'
import GetStartedNow from '@/components/user/common/GetStartedNow'
import Testimonial from '@/components/user/common/Testimonial'
import OurServices from '@/components/user/service/OurServices'
import ServicesIntro from '@/components/user/service/ServicesIntro'
import React from 'react'

const Services = () => {
  return (
    <div>
      <ServicesIntro />
      <OurServices />
      <Testimonial />
      <GetStartedNow />
      <Footer/>
    </div>
  )
}

export default Services
