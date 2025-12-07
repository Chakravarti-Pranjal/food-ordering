import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmout } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-6">
      <div className="w-full max-w-6xl mx-auto  relative py-4">
        <div
          className="flex items-center justify-between
        "
        >
          {/* Back Button */}
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <FaArrowCircleLeft size={35} className="text-[#ff4d2d]" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>

          <div></div>
        </div>

        <div className="my-8 ">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems?.map((item, index) => (
                <CartItemCard key={index} data={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-800 text-center">Cart it Empty!</p>
          )}

          <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <h1 className="text-lg font-semibold">Total Amout</h1>
            <span className="text-xl font-bold text-[#ff4d2d]">
              ₹{totalAmout}
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="bg-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg font-medium cursor-pointer hover:bg-[#e64526] transition" onClick={()=> navigate('/checkout')}>
            Proceed To CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
