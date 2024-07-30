import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyContext from '@/contexts/myContext/MyContext';
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB, storage } from '@/firebase/firebase';
import {  ref, deleteObject } from "firebase/storage";

const ProductRow = ({ item, index, imgUrl }) => {

  const { id, title, price, category, date, productImg } = item;

  const { getAllProductFunction } = useContext(MyContext)
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    try {
      const imgRef = ref(storage, productImg)
      try {
        await deleteObject(imgRef)
      } catch (error) {
        console.log(error)
      }
      await deleteDoc(doc(fireDB, 'products', id))
      getAllProductFunction();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr key={index} className="text-slate-300">
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 ">
        {index + 1}
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        <img src={imgUrl} alt="product Image" className="w-40" />
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        {title}
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        ${price}
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        {category}
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        {date}
      </td>
      <td
        onClick={() => navigate(`/updateproduct/${id}`)}
        className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500  text-green-500 cursor-pointer ">
        Edit
      </td>
      <td onClick={() => deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-red-500 cursor-pointer ">
        Delete
      </td>
    </tr>
  )
}

export default ProductRow
