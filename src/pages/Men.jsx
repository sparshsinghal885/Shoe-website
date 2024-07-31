import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MyContext from '@/contexts/myContext/MyContext';
import { SyncLoader } from 'react-spinners';
import NotFound from "../assets/rejected.png"

const Men = () => {
  const [loading, setLoading] = useState(false)

  const { getAllProduct, getImageUrl } = useContext(MyContext);
  const navigate = useNavigate();
  const categoryname = 'men'
  const filterProduct = getAllProduct.filter((obj) => obj.category === categoryname);

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    setLoading(true)
    const fetchImageUrls = async () => {
      const urls = {};
      for (const item of filterProduct) {
        if (item.productImg) {
          const url = await getImageUrl(item.productImg);
          urls[item.id] = url;
        }
      }
      setImageUrls(urls);
    };

    fetchImageUrls();
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, []);

  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
      </div>
      {loading ?

        <div className="flex justify-center">
          <SyncLoader />
        </div>

        :

        <section className="text-gray-600 body-font">
          {/* main 2 */}
          <div className="container px-5 py-5 mx-auto">
            {/* main 3  */}
            <div className="flex flex-wrap -m-4 justify-center">
              {filterProduct.length > 0
                ?
                <>
                  {filterProduct.map((item) => {

                    const imgUrl = imageUrls[item.id] || '';

                    const { id, title, price } = item

                    return (
                      <div key={id} className="p-4 w-full md:w-1/3">
                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                          <img
                            onClick={() => navigate(`/productinfo/${id}`)}
                            className="lg:h-80  h-96 w-full"
                            src={imgUrl}
                            alt="blog"
                          />
                          <div className="p-6">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              Shoepify
                            </h2>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                              {title.substring(0, 25)}
                            </h1>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                              ₹{price}
                            </h1>

                            <div className="flex justify-center ">
                              <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>

                :

                <div>
                  <div className="flex justify-center">
                    <img className=" mb-2 w-40" src={NotFound} alt="Not Found" />
                  </div>
                  <h1 className=" text-black text-xl text-center">No {categoryname} product found</h1>
                </div>
              }
            </div>
          </div>
        </section>

      }
    </div>
  )
}

export default Men
