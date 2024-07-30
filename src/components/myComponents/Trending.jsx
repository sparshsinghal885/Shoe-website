import React from 'react'
import shoe1 from './../../assets/shoes/shoe1.jpg'
import shoe2 from './../../assets/shoes/shoe2.jpg'
import shoe3 from './../../assets/shoes/shoe3.jpg'



const Trending = () => {

  const products = [
    {
      id: 1,
      name: "Nike Air Max 2021",
      image: shoe1,
      price: "$150",
    },
    {
      id: 2,
      name: "Nike Air Force 1",
      image: shoe2,
      price: "$120",
    },
    {
      id: 3,
      name: "Nike React Infinity Run",
      image: shoe3,
      price: "$160",
    }    
  ];

  return (
    <section className="bg-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl text-center font-semibold text-gray-900 mb-8">Trending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-2 text-gray-600">{product.price}</p>
                <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trending
