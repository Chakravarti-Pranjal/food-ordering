import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
  },
});

// Wrap in an async IIFE so we can use await.
export const sendEmail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "Reset Your Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });

  console.log("Message sent:", info.messageId);
};
