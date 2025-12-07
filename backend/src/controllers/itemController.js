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
    await shop.populate("owner");
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: 1 } },
    });

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

    const shop = await Shop.findOne({ owner: req.userId }).populate({
      path: "items",
      options: { sort: { updatedAt: 1 } },
    });

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

export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findByIdAndDelete(itemId);

    if (!item) {
      return res.status(400).json({
        success: false,
        message: "item not found",
      });
    }

    const shop = await Shop.findOne({ owner: req.userId }).populate({
      path: "items",
      options: { sort: { updatedAt: 1 } },
    });

    shop.items = shop.items.filter((i) => i._id !== item._id);

    await shop.save();

    return res.status(200).json({
      success: true,
      message: "item deleted successfully!",
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

export const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(400).json({
        success: false,
        message: "item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "item fetched successfully!",
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

export const getItemsByCity = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    // Find shops in the city (case insensitive)
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");

    if (shops.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No shops found in this city",
      });
    }

    // Collect all items from populated shops
    const items = shops.flatMap((shop) => shop.items);

    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found for shops in this city",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Items fetched successfully!",
      data: items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
