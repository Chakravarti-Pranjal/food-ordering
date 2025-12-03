import { Router } from "express";
import {
  googleAuth,
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
} from "../controllers/authController.js";

const authRouter = Router();
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-out", signOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);

export default authRouter;
