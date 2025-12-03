import axios from "axios";
import React, { useState } from "react";
import { baseUrl, notifyError, notifySuccess } from "../config/config";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle role change
  const handleRoleChange = (roleName) => {
    setFormData((prev) => ({ ...prev, role: roleName }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = await axios.post(`${baseUrl}/auth/sign-up`, formData, {
        withCredentials: true,
      });
      console.log(data?.data);
      if (data.success == true) {
        dispatch(setUserData(data?.data));
        notifySuccess("account created successfully!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);

      const { data } = await axios.post(`${baseUrl}/auth/google-auth`, {
        fullName: user?.displayName,
        email: user?.email,
        role: formData.role,
        mobileNo: formData.mobileNo,
      });
      if (data.success == true) {
        dispatch(setUserData(data?.data));
        notifySuccess("account created successfully!");
      }
    } catch (error) {
      console.log("Error in google auth", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-1">Lovingo</h1>
        <p className="text-gray-500 mb-6">
          Create your account to get started with delicious food deliveries
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label className="block mb-3">
            <span className="text-gray-700">Full Name</span>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
            />
          </label>

          {/* Email */}
          <label className="block mb-3">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
            />
          </label>

          {/* Mobile */}
          <label className="block mb-3">
            <span className="text-gray-700">Mobile</span>
            <input
              type="text"
              name="mobileNo"
              placeholder="Enter your Mobile Number"
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
            />
          </label>

          {/* Password */}
          <label className="block mb-3">
            <span className="text-gray-700">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          {/* Role */}
          <p className="text-gray-700 mb-2">Role</p>

          <div className="flex gap-3 mb-6">
            {["user", "owner", "deliveryBoy"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleRoleChange(item)}
                className={`px-4 py-2 rounded-lg capitalize border 
                ${
                  formData.role === item
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500 border-red-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign Up */}
        <button
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg mb-6 hover:bg-gray-50 transition cursor-pointer"
          onClick={handleGoogleAuth}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-6 h-6"
          />
          <span className="text-gray-700 font-medium">Sign Up with Google</span>
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-red-500">
            Sign-In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
