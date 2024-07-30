import HeroSection from '@/components/myComponents/HeroSection'
import Latest from '@/components/myComponents/Latest'
import ProductCard from '@/components/myComponents/ProductCard'
import Trending from '@/components/myComponents/Trending'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <Latest/>
      <Trending/>
      <ProductCard/>
    </>
  )
}

export default HomePage
