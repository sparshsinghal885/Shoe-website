import React from "react";

const UserDetail = () => {
  return (
    <div>
      <div>
        <div className="py-5 flex justify-between items-center">
          {/* text  */}
          <h1 className=" text-xl text-black font-bold">All User</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-neutral-200 text-slate-400" >
            <tbody>
              <tr>
                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Location Name</th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Action</th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-neutral-200 text-slate-700 bg-slate-100">Action</th>
              </tr>
              <tr className="text-slate-300">
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 ">
                  1.
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {'name'}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-green-500 cursor-pointer ">
                  Edit
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-red-500 cursor-pointer ">
                  Delete
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;