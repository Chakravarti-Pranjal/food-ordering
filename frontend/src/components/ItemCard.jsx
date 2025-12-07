import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { baseUrl, notifySuccess } from "../config/config";
import { useDispatch } from "react-redux";
import { setShopData } from "../redux/slices/ownerSlice";
import useFetchShop from "../hooks/useFetchShop";
import axios from "axios";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { refetchShop } = useFetchShop();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${baseUrl}/item/${item._id}`, {
        withCredentials: true,
      });

      if (data.success == true) {
        dispath(setShopData(data?.data));
        refetchShop();
        notifySuccess("item deleted successfully!");
      }
    } catch (error) {
      console.log("Error in deletion: ", error);
    }
  };
  return (
    <div className="w-full max-w-sm bg-white border border-red-200 rounded-xl p-3 flex gap-4 hover:shadow-md transition">
      {/* Image */}
      <img
        src={item?.image}
        alt={item?.name}
        className="w-28 h-28 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-red-500 font-semibold text-lg">{item?.name}</h3>

          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Category:</span> {item?.category}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Food Type:</span> {item?.foodType}
          </p>
        </div>

        {/* Price + Icons */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-500 font-bold text-lg">₹{item?.price}</span>

          <div className="flex items-center gap-3">
            <FiEdit2
              className="text-red-400 cursor-pointer hover:text-red-600"
              size={18}
              onClick={() => navigate(`/edit-item/${item?._id}`)}
            />
            <FiTrash2
              className="text-red-400 cursor-pointer hover:text-red-600"
              size={18}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
