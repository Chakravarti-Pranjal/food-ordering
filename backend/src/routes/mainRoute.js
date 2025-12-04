import { Router } from "express";
import authRouter from "./authRoutes.js";
import userRouter from "./userRoute.js";
import shopRouter from "./shopRoute.js";
import itemRouter from "./itemRoute.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/shop", shopRouter);
mainRouter.use("/item", itemRouter);

export default mainRouter;
