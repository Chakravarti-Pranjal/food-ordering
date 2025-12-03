import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./src/config/connectDB.js";
import cookieParser from "cookie-parser";
import mainRouter from "./src/routes/mainRoute.js";

config();

const app = express();
const Port = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// error middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(Port, async () => {
  await connectDB();
  console.log(`server is running on Port : ${Port}`);
});
