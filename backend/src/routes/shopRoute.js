import { Router } from "express";
import {
  createEditShop,
  getMyShop,
  getShopByCity,
} from "../controllers/shopController.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const shopRouter = Router();

shopRouter.post("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRouter.get("/my", isAuth, getMyShop);
shopRouter.get("/:city", isAuth, getShopByCity);

export default shopRouter;
