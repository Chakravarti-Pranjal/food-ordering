import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";


const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fff9f6]  w-full">
     <div className="p-6 max-w-6xl mx-auto">
         <div
        className="flex items-center justify-between gap-6"
      >
        {/* Back Button */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <FaArrowCircleLeft size={35} className="text-[#ff4d2d]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">Place Order</h1>

        <div></div>
      </div>

      <section className="my-8">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800"> <FaLocationDot /> Delivery Location</h2>
      </section>
     </div>
    </div>
  );
};

export default Checkout;
