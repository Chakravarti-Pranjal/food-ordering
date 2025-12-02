import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./src/config/connectDB.js";
import cookieParser from "cookie-parser";
import mainRouter from "./src/routes/mainRooutes.js";
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

// error middleware
app.use((err, req, res, next) => {
  console.log("Error : ", err.message);
  next();
});

app.listen(Port, async () => {
  await connectDB();
  console.log(`server is running on Port : ${Port}`);
});
