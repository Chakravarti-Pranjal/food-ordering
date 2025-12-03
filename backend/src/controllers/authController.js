import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/token.js";
import { generateOTP } from "../utils/helper.js";
import { sendEmail } from "../utils/sendMail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobileNo, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exist" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    if (mobileNo.length < 10) {
      return res
        .status(400)
        .json({ message: "mobileNo must be at least 10 digits." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobileNo,
      role,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      success: true,
      message: "user created successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "user logged in successfully!",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "user sign-out successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();

    const user = await User.findOneAndUpdate(
      { email },
      {
        resetOtp: otp,
        otpExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true } // returns updated doc
    );

    if (!user) {
      return res.status(400).json({ message: "User Does not exist" });
    }

    await sendEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Does not exist" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "otp expired!",
      });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Otp verified successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "otp virification required" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    user.password = hashpassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "password reset successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobileNo, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobileNo,
        role,
      });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      success: true,
      message: "user created successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Google auth error",
    });
  }
};
