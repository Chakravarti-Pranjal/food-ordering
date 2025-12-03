import React, { useState } from "react";
import { baseUrl, notifyError, notifySuccess } from "../config/config";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1 - Send OTP
  const handleSendOtp = async () => {
    try {
      if (!formData.email) return notifyError("Please enter email");
      const { data } = await axios.post(
        `${baseUrl}/auth/send-otp`,
        {
          email: formData.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      if (data?.success == true) {
        notifySuccess(data?.message);
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      notifyError(error.message || "something went wrong!");
    }
  };

  // Step 2 - Verify OTP
  const handleVerifyOtp = async () => {
    try {
      if (!formData.email) return notifyError("Please enter email");
      const { data } = await axios.post(
        `${baseUrl}/auth/verify-otp`,
        {
          email: formData.email,
          otp: formData.otp,
        },
        { withCredentials: true }
      );
      console.log(data);
      if (data?.success == true) {
        notifySuccess(data?.message);
        setStep(3);
      }
    } catch (error) {
      console.log(error);
      notifyError(error.message || "something went wrong!");
    }
  };

  // Step 3 - Change Password
  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      return notifyError("Passwords do not match!");
    }

    try {
      const { data } = await axios.post(
        `${baseUrl}/auth/reset-password`,
        {
          email: formData.email,
          password: formData.newPassword,
        },
        { withCredentials: true }
      );
      console.log(data);
      if (data?.success == true) {
        notifySuccess(data?.message);
      }
    } catch (error) {
      console.log(error);
      notifyError(error.message || "something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-red-500">
          Forgot Password
        </h1>

        {/* ---------------- STEP 1 ---------------- */}
        {step === 1 && (
          <div>
            <label className="block mb-4">
              <span className="text-gray-700">Enter Registered Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </label>

            <button
              onClick={handleSendOtp}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* ---------------- STEP 2 ---------------- */}
        {step === 2 && (
          <div>
            <label className="block mb-4">
              <span className="text-gray-700">Enter OTP</span>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </label>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Verify OTP
            </button>

            <button
              onClick={() => setStep(1)}
              className="text-red-500 mt-3 underline text-sm"
            >
              Change Email
            </button>
          </div>
        )}

        {/* ---------------- STEP 3 ---------------- */}
        {step === 3 && (
          <div>
            <label className="block mb-4">
              <span className="text-gray-700">New Password</span>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </label>

            <button
              onClick={handleResetPassword}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
