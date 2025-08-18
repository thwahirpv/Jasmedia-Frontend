import Footer from '@/components/user/common/Footer'
import PortfolioIntro from '@/components/user/portfolio/PortfolioIntro'
import PortfolioList from '@/components/user/portfolio/PortfolioList'
import React from 'react'

const Portfolio = () => {
  return (
    <div>
      <PortfolioIntro />
      <PortfolioList />
      <Footer />
    </div>
  )
}

export default Portfolio
