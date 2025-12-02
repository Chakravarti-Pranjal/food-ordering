import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobileNo, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.Status(400).json({ message: "User Already exist" });
    }
    if (password.length < 6) {
      return res
        .Status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    if (mobileNo.length < 10) {
      return res
        .Status(400)
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.Status(400).json({ message: "User Does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.Status(400).json({ message: "Incorrect password" });
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

export const signOut = async () => {
  try {
    res.clearCookie(token);
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
