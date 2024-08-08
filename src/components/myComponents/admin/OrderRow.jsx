import React, { useContext } from 'react'
import MyContext from '@/contexts/myContext/MyContext'

const OrderRow = ({order, imgUrl, item, index, orderID}) => {

        const {deleteItemFromOrder} = useContext(MyContext)

        const { id, title, category, price, quantity } = item
        return (<tr className="text-pink-300" key={index}>
          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 ">
            {index + 1}
          </td>

          <td className="h-12 w-16 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 ">
            {id}
          </td>

          <td className="h-28 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            <img src={imgUrl} alt={title} />
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {title}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {category}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            $ {price}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase text-center ">
            {quantity}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            $ {price * quantity}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {order.status}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {order.addressInfo.name}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {order.addressInfo.address}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {order.addressInfo.pincode}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {order.addressInfo.mobileNumber}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {order.email}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            {order.date}
          </td>

          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-red-500 cursor-pointer "
            onClick={() => deleteItemFromOrder(orderID, id)}
          >
            Delete
          </td>
        </tr>)
}

export default OrderRow
