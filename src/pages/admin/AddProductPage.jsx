import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fireDB , storage} from "@/firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
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
const AddProductPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

  const addProductFunction = async () => {
    if (product.title == "" || product.price == "" || product.productImg == "" || 
      product.category == "" || product.description == "") {
      alert("all fields are required")
    }

    setLoading(true);
    try {

      const imgRef = ref(storage, `uploads/images/${Date.now()}-${product.productImg.name}`)
      const imgRes = await uploadBytes(imgRef,product.productImg)

      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, {
        ...product,
        productImg:imgRes.ref.fullPath
      })

      navigate('/admin-dashboard')
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
      alert("Add product failed");
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
              Add Product
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
              onClick={addProductFunction}
              className='bg-slate-950 hover:bg-slate-800 w-full text-white text-center py-2 font-bold rounded-md '
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;