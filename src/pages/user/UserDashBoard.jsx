import { useContext, useState, useEffect } from 'react';
import React from "react";
import userImg from '../../assets/user.png'
import MyContext from "@/contexts/myContext/MyContext";
import { useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners';


const UserDashboard = () => {

  const { getAllOrder, getImageUrl } = useContext(MyContext)

  const user = JSON.parse(localStorage.getItem('users'));

  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});

  // console.log(getAllOrder)

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = {};

      // Check if getAllOrder and its cartItems exist
      if (getAllOrder) {
        for (const order of getAllOrder) {
          for (const item of order.cartItems) {
            if (item.productImg) {
              try {
                const url = await getImageUrl(item.productImg);
                urls[item.id] = url;
              } catch (error) {
                console.error(`Failed to fetch image URL for item ${item.id}`, error);
              }
            }
          }
        }
      }

      // Update the state with the fetched URLs
      setImageUrls(urls);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    fetchImageUrls();
  }, [getAllOrder, getImageUrl]);

  return (
    <>
      <div className=" container mx-auto px-4 py-5 lg:py-8">
        {/* Top  */}
        <div className="top ">
          {/* main  */}
          <div className=" bg-slate-100 py-5 rounded-xl border border-neutral-200">
            {/* image  */}
            <div className="flex justify-center">
              <img src={userImg} alt="user" className="w-20" />
            </div>
            {/* text  */}
            <div className="mt-4">
              <h1 className=" text-center text-lg"><span className=" font-bold">Name :</span> {user?.name}</h1>
              <h1 className=" text-center text-lg"><span className=" font-bold">Email :</span>{user?.email}</h1>
              <h1 className=" text-center text-lg"><span className=" font-bold">Date :</span>{user?.date}</h1>
              <h1 className=" text-center text-lg"><span className=" font-bold">Role :</span>{user?.role}</h1>
            </div>
          </div>
        </div>

        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

            {loading && 
              <div className="flex justify-center">
                <SyncLoader />
              </div>
            }

            {getAllOrder.filter((obj) => obj.userid === user.uid)
              .map((order, index) => {
                return (
                  <div key={index}>
                    {order.cartItems.map((item, index) => {

                      const { id, date, quantity, price, title, category } = item

                      const imgUrl = imageUrls[item.id] || '';
                      return (
                        <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-neutral-200 md:flex-row">
                          {/* main 3  */}
                          <div className="w-full border-r border-neutral-100 bg-neutral-50 md:max-w-xs">
                            {/* left  */}
                            <div className="p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-black">Order Id</div>
                                  <div className="text-sm font-medium text-gray-900">{id}</div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">Date</div>
                                  <div className="text-sm font-medium text-gray-900">{date}</div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">Total Amount</div>
                                  <div className="text-sm font-medium text-gray-900">${price * quantity}</div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">Order Status</div>
                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase">{order.status}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* right  */}
                          <div className="flex-1">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-gray-200">

                                <li
                                  className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                >
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                        src={imgUrl}
                                        alt={title}
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">{title}</p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">${price}</p>
                                  </div>
                                </li>

                              </ul>

                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;


