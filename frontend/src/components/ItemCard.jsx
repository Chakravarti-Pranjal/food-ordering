import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ItemCard = ({ data }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-red-200 rounded-xl p-3 flex gap-4 hover:shadow-md transition">
      {/* Image */}
      <img
        src={data?.image}
        alt={data?.name}
        className="w-28 h-28 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-red-500 font-semibold text-lg">{data?.name}</h3>

          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Category:</span> {data?.category}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Food Type:</span> {data?.foodType}
          </p>
        </div>

        {/* Price + Icons */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-500 font-bold text-lg">₹{data?.price}</span>

          <div className="flex items-center gap-3">
            <FiEdit2
              className="text-red-400 cursor-pointer hover:text-red-600"
              size={18}
            />
            <FiTrash2
              className="text-red-400 cursor-pointer hover:text-red-600"
              size={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
