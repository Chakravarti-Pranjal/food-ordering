import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { addItem, editItem } from "../controllers/itemController.js";
import { upload } from "../middlewares/multer.js";

const itemRouter = Router();

itemRouter.post("/add", isAuth, upload.single("image"), addItem);
itemRouter.post("/:itemId", isAuth, upload.single("image"), editItem);

export default itemRouter;
