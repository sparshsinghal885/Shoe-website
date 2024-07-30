import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = () => {

  const navigate = useNavigate()

  const productData = [
    {
      id: 1,
      image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
      title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
      desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
      price: 150,
      trendingProductName: 'Featured',
      quantity: 1,
    },
  ]

  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-6xl text-center font-semibold text-gray-900 mb-8">Bestselling Products</h1>
      </div>
      {/* main  */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productData.map((item, index) => {
              const { image, title, price } = item
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      onClick={() => navigate('productinfo')}
                      className="lg:h-80  h-96 w-full"
                      src={image}
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ${price}
                      </h1>
                      <div className="flex justify-center ">
                        <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductCard
