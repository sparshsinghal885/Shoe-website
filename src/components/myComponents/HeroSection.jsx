import React from 'react'
import WordRotate from '../magicui/word-rotate'
import ShinyButton from '../magicui/shiny-button'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

  const navigate = useNavigate()

  const buttonHandler = () => {
    navigate('/allproducts')
  }

  return (
    <div className='max-w-8xl mx-auto pt-20 px-6 h-screen'>
      <div className='flex flex-col items-center mt-6 lg:mt-20'>
        <h1 className='text-4xl sm:text-6xl lg:text-8xl text-center tracking-wide font-semibold text-shadow-lg'>
          Step Into Style:
          <WordRotate
            className="text-9xl font-semibold text-black dark:text-white"
            words={["Discover", "Find", "Uncover"]}
          />
          Your Perfect Pair
        </h1>

        <p className='mt-10 text-xl text-center text-neutral-500 max-w-4xl'>
          Step into the latest trends with our curated collection of stylish, comfortable shoes. Discover your perfect pair and elevate your footwear game with unmatched quality and design. Shop now and walk with confidence!
        </p>

        <ShinyButton text="Explore" className=" mt-9 bg-slate-900 " onClick={buttonHandler} />
      </div>
    </div>
  )
}

export default HeroSection
