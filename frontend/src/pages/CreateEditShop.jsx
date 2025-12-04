import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl, notifySuccess } from "../config/config";
import { setShopData } from "../redux/slices/ownerSlice";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shopData } = useSelector((state) => state.owner);
  const { city, state, address } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    name: shopData?.name || "",
    address: shopData?.address || address || "",
    city: shopData?.city || city || "",
    state: shopData?.state || state || "",
  });

  const [frontImg, setFrontImg] = useState( shopData?.image || null);
  const [backImg, setBackImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackImg(file);
    setFrontImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("city", form.city);
      formData.append("state", form.state);
      formData.append("address", form.address);
      if (backImg) {
        formData.append("image", backImg);
      }

      const { data } = await axios.post(
        `${baseUrl}/shop/create-edit`,
        formData,
        { withCredentials: true }
      );
      console.log(data);
      if (data?.success) {
        dispatch(setShopData(data?.data));
        notifySuccess("Shop created successfully!");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50  to-white min-h-screen relative">
      <div
        className="absolute top-[20px] left-[20px] x-10 mb-[10px]"
        onClick={() => navigate("/")}
      >
        <FaArrowCircleLeft
          size={35}
          className="text-[#ff4d2d] cursor-pointer"
        />
      </div>

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4 ">
            <ImSpoonKnife
              size={35}
              className="text-[#ff4d2d]
                  w-16 h-16"
            />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {shopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={handleImage}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {frontImg && (
              <div className="mt-4">
                <img
                  src={frontImg}
                  alt="img"
                  className="w-full h-48 object-cover rounded-lg bordre border-gray-200"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={form.address}
              name="address"
              onChange={handleChange}
              placeholder="Enter Shop Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={form.city}
                name="city"
                onChange={handleChange}
                placeholder="Enter Shop City"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={form.state}
                name="state"
                onChange={handleChange}
                placeholder="Enter Shop State"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-lg font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
