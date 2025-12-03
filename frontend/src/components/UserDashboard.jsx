import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { baseUrl, notifySuccess } from "../config/config";
import axios from "axios";
import { setUserData } from "../redux/slices/userSlice";

const UserDashboard = () => {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/sign-out`, {
        withCredentials: true,
      });
      console.log(data);

      if (data.success == true) {
        notifySuccess("Log out!");
        dispatch(setUserData(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-between md:justify-center gap-[30px] px-[20px] sticky top-0 z-[999] bg-[#fff9f6] overflow-visible relative`}
    >
      {showSearch && (
        <div className="w-11/12 flex  h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] absolute top-14 mx-auto justify-center">
          <div className=" flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="flex items-center w-[70%] overflow-hidden gap-[10px] px-[10px]  border-gray-400">
            <CiSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food"
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Lovingo</h1>
      <div className="hidden md:flex md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] ">
        <div className=" flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">{city}</div>
        </div>
        <div className="flex items-center w-[70%] overflow-hidden gap-[10px] px-[10px]  border-gray-400">
          <CiSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="search delicious food"
            className="px-[10px] text-gray-700 outline-0 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button
          className="md:hidden relative cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          {showSearch ? (
            <RxCross2 size={25} className="text-[#ff4d2d]" />
          ) : (
            <CiSearch size={25} className="text-[#ff4d2d]" />
          )}
        </button>

        <div className="relative cursor-pointer">
          <FaShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
            0
          </span>
        </div>

        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium ">
          My Order
        </button>

        <div className="relative">
          <button
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer text-center"
            onClick={() => setShowInfo((prev) => !prev)}
          >
            {userData?.fullName.slice(0, 1)}
          </button>

          {showInfo && (
            <div className="absolute mt-2 right-0 w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-2 z-[999]">
              <div className="text-[17px] font-semibold">
                {userData?.fullName}
              </div>

              <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
                My Orders
              </div>

              <button
                className="text-[#ff4d2d] font-semibold cursor-pointer text-start"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
