import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateQuantity, removeCartItem } from "../redux/slices/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty <= 1) return; // 🔥 STOP at 1, don't go below
    dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
  };

  const handleDelete = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <img
          src={data?.image}
          alt="img"
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div>
          <h1 className="font-semibold text-gray-800">{data?.name}</h1>

          <p className="text-sm text-gray-500">
            ₹{data?.price} x {data?.quantity}
          </p>

          <p className="font-bold text-gray-900">
            ₹{data?.price * data?.quantity}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* COUNTER */}
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full gap-3">
          <button
            onClick={() => handleDecrease(data?.id, data?.quantity)}
            disabled={data?.quantity <= 1} // 🔥 Disable button visually
            className={`text-lg font-bold ${
              data?.quantity <= 1 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            -
          </button>

          <span className="text-lg font-semibold">{data?.quantity}</span>

          <button
            onClick={() => handleIncrease(data?.id, data?.quantity)}
            className="text-lg font-bold"
          >
            +
          </button>
        </div>

        {/* DELETE BUTTON */}
        <button
          className="p-2 text-red-500 hover:text-red-700 transition"
          onClick={() => handleDelete(data?.id)}
        >
          <FiTrash2 size={22} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
