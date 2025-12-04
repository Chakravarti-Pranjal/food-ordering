import Shop from "../models/shop.model.js";
import uploadOnCloud from "../utils/cloudinary.js";

export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloud(req.file.path);
    }
    let shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.userId,
        },
        { new: true }
      );
    }

    await shop.populate("owner items");

    return res.status(201).json({
      success: true,
      message: "shop created successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      "owner items"
    );
    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "shop not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "shop fetched successfully!",
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
