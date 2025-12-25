import AboutCompany from '@/components/user/about/AboutCompany'
import AboutConclution from '@/components/user/about/AboutConclution'
import AboutIntro from '@/components/user/about/AboutIntro'
import AboutUsSection from '@/components/user/about/AboutUsSection'
import Footer from '@/components/user/common/Footer'
import TeamMembers from '@/components/user/about/TeamMembers'
import TeamSetupSteps from '@/components/user/about/TeamSetupSteps'
import React from 'react'
import GetStartedNow from '@/components/user/common/GetStartedNow'

const About = () => {
  return (
    <div>
        <AboutIntro />
        <AboutCompany />
        <AboutUsSection />
        <TeamSetupSteps />
        <TeamMembers />
        <GetStartedNow />
    </div>
  )
}

export default About
