import React, { useState, useEffect, useContext } from 'react';
import { Trash } from 'lucide-react';
import { SyncLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, incrementQuantity, decrementQuantity } from '@/redux/cartSlice';
import MyContext from '@/contexts/myContext/MyContext';
import emptyCart from '../assets/empty-cart.png'
import BuyNowDialog from '@/components/myComponents/BuyNowDialog';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { fireDB } from '@/firebase/firebase';


const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const { getImageUrl } = useContext(MyContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = {};
      for (const item of cartItems) {
        if (item.productImg) {
          const url = await getImageUrl(item.productImg);
          urls[item.id] = url;
        }
      }
      setImageUrls(urls);
      setLoading(false);
    };
    
    fetchImageUrls();
  }, [cartItems, getImageUrl]);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteCart = (item) => {
    const timestamp = {
      seconds: item.time.seconds,
      nanoseconds: item.time.nanoseconds,
    };
    dispatch(deleteFromCart({ ...item, time: timestamp }));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItemTotal = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const user = JSON.parse(localStorage.getItem('users'))

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  const buyNowFunction = () => {
    // validation 
    if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
      return alert("All Fields are required")
    }

    // Order Info 
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }

    try {
      const orderRef = collection(fireDB, 'order');
      addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      })
      alert("Order Placed Successfull")
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="container mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">Cart items</h2>
            {loading ? (
              <div className="flex justify-center">
                <SyncLoader />
              </div>
            ) : (
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => {
                    const imgUrl = imageUrls[item.id] || '';
                    const { id, title, price, quantity, category } = item;
                    return (
                      <li key={index} className="flex py-6 sm:py-6">
                        <div className="flex-shrink-0">
                          <img
                            src={imgUrl}
                            alt={title}
                            className="sm:h-38 sm:w-38 lg:w-56 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="font-semibold text-black">{title}</h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-sm text-gray-500">{category}</p>
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-xs font-medium text-gray-500">${price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2 flex">
                          <div className="min-w-24 flex">
                            <button
                              onClick={() => handleDecrement(id)}
                              type="button"
                              className="h-7 w-7 border rounded-md"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="mx-1 h-7 w-9 rounded-md border text-center"
                              value={quantity}
                              readOnly
                            />
                            <button
                              onClick={() => handleIncrement(id)}
                              type="button"
                              className="flex h-7 w-7 items-center border rounded-md justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-6 flex text-sm">
                            <button
                              type="button"
                              onClick={() => deleteCart(item)}
                              className="flex items-center space-x-1 px-2 py-1 pl-0"
                            >
                              <Trash size={12} className="text-red-500" />
                              <span className="text-xs font-medium text-red-500">Remove</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <div className='flex justify-center space-x-4'>
                    <h1 className='text-7xl font-light'>Empty cart</h1>
                    <img src={emptyCart} className='w-20' />
                  </div>
                )}
              </ul>
            )}
          </section>
          <section aria-labelledby="summary-heading" className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
            <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900">
              Order Summary
            </h2>
            <div>
              <dl className="space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price ({cartItemTotal} items)</dt>
                  <dd className="text-sm font-medium text-gray-900">${cartTotal}</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">${cartTotal}</dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                <div className="flex gap-4 mb-6">
                  {user
                    ? <BuyNowDialog
                      addressInfo={addressInfo}
                      setAddressInfo={setAddressInfo}
                      buyNowFunction={buyNowFunction}
                    /> : <Navigate to={'/auth/signin'} />
                  }
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
