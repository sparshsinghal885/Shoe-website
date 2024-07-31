import { useNavigate } from "react-router";
import MyContext from "@/contexts/myContext/MyContext";
import { useContext, useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "@/redux/cartSlice";


const HomePageProducts = () => {
  const navigate = useNavigate();

  const { getAllProduct, getImageUrl } = useContext(MyContext)
  const [loading, setLoading] = useState(false)

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    setLoading(true)
    const fetchImageUrls = async () => {
      const urls = {};
      for (const item of getAllProduct) {
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
  }, [getAllProduct]);

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="py-8">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-5xl font-semibold">Newly Launched Shoes</h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font ">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center">
              {loading && <HashLoader color='#282727' />}
            </div>
            <div className="flex flex-wrap -m-4">
              {getAllProduct.slice(0, 9).map((item) => {

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

                        <div
                          className="flex justify-center ">
                          {cartItems.some((p) => p.id === item.id)

                            ?
                            <button onClick={() => deleteCart(item)} className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                              Remove from Cart
                            </button>

                            :

                            <button onClick={() => addCart(item)} className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                              Add to Cart
                            </button>
                          }
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
    </>
  );
}

export default HomePageProducts;