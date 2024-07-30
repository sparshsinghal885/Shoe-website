import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp, getDoc, setDoc, doc } from "firebase/firestore";
import { fireDB, storage } from "@/firebase/firebase";
import { HashLoader } from "react-spinners";
import MyContext from "@/contexts/myContext/MyContext";
import { ref,uploadBytes } from "firebase/storage";

const categoryList = [
  {
    name: 'kids'
  },
  {
    name: 'men'
  },
  {
    name: 'women'
  },
]

const UpdateProductPage = () => {

  const { getAllProductFunction } = useContext(MyContext)

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { id } = useParams()

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    productImg: "",
    size: '',
    quantity: 1,
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

  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id))
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        size: product?.size,
        productImg: product?.productImg,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date
      })
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  const updateProduct = async () => {
    setLoading(true)
    try {

      const imgRef = ref(storage, `uploads/images/${Date.now()}-${product.productImg.name}`)
      const imgRes = await uploadBytes(imgRef, product.productImg)

      await setDoc(doc(fireDB, 'products', id), { ...product, productImg: imgRes.ref.fullPath })
      getAllProductFunction();
      setLoading(false)
      navigate('/admin-dashboard')

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        {/* Login Form  */}
        <div className="login_Form bg-slate-100 px-8 py-6 border border-neutral-200 rounded-xl shadow-md">

          {/* Top Heading  */}
          <div className="mb-5 ">
            <h2 className='text-center text-4xl font-semibold text-black '>
              Update Product
            </h2>
            <div className="w-full flex justify-center">
              {loading && <HashLoader color='#282727' />}
            </div>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              required
              placeholder='Product Title'
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value
                })
              }}
              className='bg-slate-100 text-slate-700 border border-neutral-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-300'
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              required
              placeholder='Product Price'
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value
                })
              }}
              className='bg-slate-100 text-slate-700 border border-neutral-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-300'
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              required
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImg: e.target.files[0]
                })
              }}
              className='bg-slate-100 text-slate-700 border border-neutral-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-300'
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value
                })
              }}
              className="w-full px-1 py-2 text-slate-700 bg-slate-100 border border-neutral-200 rounded-md outline-none  ">
              <option >Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value
                return (
                  <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          {/* Input five  */}
          <div className="mb-3">
            <input
              value={product.size}
              onChange={(e) => {
                setProduct({
                  ...product,
                  size: e.target.value
                })
              }}
              type="number"
              min={4}
              max={10}
              required
              placeholder='size'
              className='bg-slate-100 text-slate-700 border border-neutral-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-300'
            />
          </div>

          {/* Input six  */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value
                })
              }}
              name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-slate-700 bg-slate-100 border border-neutral-200 rounded-md outline-none placeholder-slate-300 ">

            </textarea>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              type='button'
              onClick={updateProduct}
              className='bg-slate-950 hover:bg-slate-800 w-full text-white text-center py-2 font-bold rounded-md '
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductPage;