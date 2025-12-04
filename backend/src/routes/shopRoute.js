import { Router } from "express";
import { createEditShop, getMyShop } from "../controllers/shopController.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const shopRouter = Router();

shopRouter.post("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRouter.get("/my", isAuth, getMyShop);

export default shopRouter;
