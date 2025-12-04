import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloud from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloud(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.userId }).populate("items");

    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "shop not found!",
      });
    }

    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });

    shop.items.push(item._id);

    await shop.save({ validateModifiedOnly: true });
    await shop.populate("items owner");

    return res.status(201).json({
      success: true,
      message: "item added successfully!",
      data: shop,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloud(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        foodType,
        price,
        image,
      },
      { new: true }
    );

    if (!item) {
      return res.status(400).json({
        success: false,
        message: "item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "item updated successfully!",
      data: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
