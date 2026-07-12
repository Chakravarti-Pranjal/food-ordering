import React from 'react'
import {FaCircleCheck} from 'react-icons/fa6';

const OrderPlaced = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fff9f6] w-full flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <FaCircleCheck className="text-green-600 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="text-gray-600 mt-2 text-center">Thank you for your order. Your order is being prepared. You can track <br />your order status in the "My Order" section.</p>

        <button className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-6 py-3 rounded-lg text-lg font-medium transition mt-4 cursor-pointer" onClick={() => navigate('/my-orders')}>
          Back to my orders
        </button>
    </div>
  )
}

export default OrderPlaced