import React from 'react'
import HomeOne from '../../components/userComponent/Home/FirstSlider'
import Gap from '../../components/userComponent/Home/Gap'
import SecondSlider from '../../components/userComponent/Home/SecondSlider'
import FeaturedProjects from '../../components/userComponent/Home/LastSlider'


const Home = () => {
  return (
    <>
    <HomeOne></HomeOne>
    <Gap></Gap>
    <SecondSlider></SecondSlider>
    <Gap></Gap>
    <FeaturedProjects></FeaturedProjects>
    </>
  
  )
}

export default Home
