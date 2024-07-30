import { Link,  } from "react-router-dom";
import MyContext from "@/contexts/myContext/MyContext";
import { useContext, useEffect, useState } from "react";
import ProductRow from "./ProductRow";


const ProductDetail = () => {

  const { getAllProduct, getImageUrl } = useContext(MyContext)

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
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
  }, [getAllProduct]);

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-2xl text-slate-900 font-bold">All Product</h1>
        {/* Add Product Button  */}
        <Link to={'/addproduct'}>
          <button className="px-5 py-2 bg-neutral-900 border border-white text-white 
          transform hover:scale-105 transition-all duration-200  rounded-lg">Add Product</button>
        </Link>
      </div>
      {/* table  */}
      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border border-collapse sm:border-separate border-neutral-200 text-slate-400" >
          <tbody>
            <tr>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Title</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Price</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Category</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Date</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Action</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Action</th>
            </tr>

            {getAllProduct.map((item, index) => {
              const imgUrl = imageUrls[item.id] || ''; // Get pre-fetched URL

              return (
                <ProductRow
                  key={item.id}
                  item={item}
                  index={index}
                  imgUrl={imgUrl}
                />
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDetail;