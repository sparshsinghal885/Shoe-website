import HeroSection from '@/components/myComponents/HeroSection'
import Latest from '@/components/myComponents/Latest'
import Trending from '@/components/myComponents/Trending'
import React from 'react'
import HomePageProducts from './HomePageProducts'

const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <Latest/>
      <Trending/>
      <HomePageProducts/>
    </>
  )
}

export default HomePage
