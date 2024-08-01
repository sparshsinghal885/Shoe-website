import React, { useEffect, useState, useContext } from 'react'
import MyContext from '@/contexts/myContext/MyContext';
import { useParams } from 'react-router-dom';
import { fireDB } from '@/firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
import { SyncLoader } from 'react-spinners';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "@/redux/cartSlice";

const ProductInfo = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0);
  }, []);

  const { getImageUrl } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState('')
  const { id } = useParams()
  const [imgUrl, setImageUrl] = useState('')

  const getProductData = async () => {
    setLoading(true);
    try {
      const productDoc = await getDoc(doc(fireDB, "products", id));
      const productData = productDoc.data();
      setProduct({...productData, id});

      if (productData?.productImg) {
        const url = await getImageUrl(productData.productImg);
        setImageUrl(url);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  const addCart = (item) => {
    const timestamp = {
      seconds: item.time.seconds,
      nanoseconds: item.time.nanoseconds,
    };
    dispatch(addToCart({
      ...item,
      time: timestamp, // Convert to a serializable format
    }));
  }

  const deleteCart = (item) => {
    const timestamp = {
      seconds: item.time.seconds,
      nanoseconds: item.time.nanoseconds,
    };
    dispatch(deleteFromCart({
      ...item,
      time: timestamp
    }));
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])



  if (loading) {
    return <div className='w-screen flex mt-5 justify-center'>
      {loading && <SyncLoader color='#282727' />}
    </div>;
  }

  return (
    <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex flex-wrap mb-24 -mx-4">
          <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
            <div className="">
              <div className="">
                <img
                  className=" w-full lg:h-[39em] rounded-lg"
                  src={imgUrl}
                  alt={product.title}
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-6 ">
                <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                  {product.title}
                </h2>
                <div className="flex flex-wrap items-center mb-6">
                  <ul className="flex mb-4 mr-2 lg:mb-0">
                    <li>
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-black dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-black dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-black dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-black dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                  <span>${product.price}</span>
                </p>
                <br />
                <p className="inline-block text-2xl mt-3 font-semibold text-gray-700 dark:text-gray-400 ">
                  <span>{product.category}</span>
                </p>
                <br />
                <p className="inline-block text-2xl mt-3 font-semibold text-gray-700 dark:text-gray-400 ">
                  <span>size:{product.size}</span>
                </p>
              </div>
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                </h2>
                <p>{product.description}</p>
              </div>
              <div className="mb-6 " />
              <div
                className="flex justify-center ">
                {cartItems.some((p) => p.id === product.id)

                  ?
                  <button onClick={() => deleteCart(product)} className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                    Remove from Cart
                  </button>

                  :

                  <button onClick={() => addCart(product)} className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                    Add to Cart
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductInfo
