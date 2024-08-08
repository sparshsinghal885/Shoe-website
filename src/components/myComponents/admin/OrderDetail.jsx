import React, { useContext, useState, useEffect } from "react";
import MyContext from "@/contexts/myContext/MyContext";
import OrderRow from "./OrderRow";

const OrderDetail = () => {

  const { getAllOrder, getImageUrl } = useContext(MyContext)
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = {};
      for (const order of getAllOrder) {
        for (const item of order.cartItems) {
          if (item.productImg) {
            const url = await getImageUrl(item.productImg);
            urls[item.id] = url;
          }
        }
      }
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [getAllOrder]);
  
  return (
    <div>
      <div>
        <div className="py-5">
          {/* text  */}
          <h1 className=" text-xl text-neutral-900 font-bold">All Order</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-neutral-300 text-slate-400" >
            <tbody>
              <tr >
                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100 font-bold fontPara">
                  S.No.
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Order Id
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Image
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Title
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Category
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Price
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Quantity
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Total Price
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Status
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Name
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Address
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Pincode
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Phone Number
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Email
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Date
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">
                  Action
                </th>


              </tr>

              {getAllOrder.map((order) => {
                return order.cartItems.map((item, itemIndex) => {
                  const imgUrl = imageUrls[item.id] || '';
                  return (
                    <OrderRow
                      orderID={order.id}
                      key={item.id}
                      order={order}
                      item={item}
                      imgUrl={imgUrl}
                      index={itemIndex}
                    />
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;