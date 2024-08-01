import React from 'react'
import latestImage from "../../assets/Latest/Latest.jpg"
import { useNavigate } from 'react-router-dom'

const Latest = () => {
  const navigate = useNavigate()
  return (
    <div
      className="h-screen mt-20 bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${latestImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded">
        <h1 className="text-4xl font-bold mb-4">Latest Collection</h1>
        <p className="text-lg">Discover the latest trends in our newest collection of shoes.</p>
        <button
          onClick={() => {
            navigate('/allproducts')
          }}
          className="mt-6 px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200">
          Shop Now
        </button>
      </div>
    </div>
  )
}

export default Latest
