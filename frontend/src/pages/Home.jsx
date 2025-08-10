import React from 'react'
import OffersCarousel from '../components/OffersCarousel'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <OffersCarousel />
      <LatestCollection />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
