import React, { useState } from "react";
import { FaStar, FaLeaf } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/userSlice";

const FoodCard = ({ data }) => {
  const [rating, setRating] = useState(data?.rating?.average || 0);
  const [hover, setHover] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.user);

  // Corrected isVeg logic based on foodType
  const isVeg = data?.foodType?.toLowerCase() === "veg";

  return (
    <div className="w-[270px] bg-white shadow-md hover:shadow-xl rounded-2xl border border-[#ff4d2d] overflow-hidden transition-all duration-300">
      {/* IMAGE */}
      <div className="relative w-full h-[180px]">
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full h-full object-cover scale-105 transition-transform duration-300"
        />

        {/* Veg/Non-Veg Icon */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
          {isVeg ? (
            <FaLeaf className="text-green-600 w-6 h-6" />
          ) : (
            <GiChickenOven className="text-red-600 w-6 h-6" />
          )}
        </div>
      </div>

      {/* DETAILS */}
      <div className="p-4 flex flex-col gap-2">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {data?.name}
        </h3>

        {/* ⭐ STAR RATING */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                size={18}
                className={`cursor-pointer transition-all duration-200 ${
                  (hover || rating) >= starValue
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
          <span className="text-sm text-gray-500 ml-1">{rating}</span>
        </div>

        {/* PRICE + CART */}
        <div className="flex justify-between items-center mt-2">
          {/* PRICE */}
          <p className="text-xl font-bold text-gray-800">₹{data?.price}</p>

          {/* COUNTER */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <button
              onClick={() => setQty(qty > 0 ? qty - 1 : 0)}
              className="text-lg font-bold cursor-pointer"
            >
              -
            </button>
            <span className="text-lg font-semibold">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="text-lg font-bold cursor-pointer"
            >
              +
            </button>
          </div>

          {/* CART BUTTON */}
          <button
            className={`text-white py-2 px-3 rounded-lg transition-colors ${
              cartItems.some((i) => i.id === data._id)
                ? "bg-gray-800"
                : "bg-[#ff4d2d] hover:bg-[#e63e1e]"
            } ${
              qty === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              if (qty > 0) {
                dispatch(
                  addToCart({
                    id: data._id,
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    shop: data.shop,
                    quantity: qty,
                    foodType: data.foodType,
                  })
                );
              }
            }}
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
