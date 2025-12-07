import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addItem,
  deleteItem,
  editItem,
  getItemById,
  getItemsByCity,
} from "../controllers/itemController.js";
import { upload } from "../middlewares/multer.js";

const itemRouter = Router();

itemRouter.post("/add", isAuth, upload.single("image"), addItem);
itemRouter.post("/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/:itemId", isAuth, getItemById);
itemRouter.delete("/:itemId", isAuth, deleteItem);
itemRouter.get("/by-city/:city", isAuth, getItemsByCity);

export default itemRouter;
