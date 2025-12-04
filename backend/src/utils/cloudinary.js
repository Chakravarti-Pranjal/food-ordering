import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloud = async (file) => {
  try {
    cloudinary.config({
      cloud_name: "dlooikc96",
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const res = await cloudinary.uploader.upload(file);
    fs.unlinkSync(file);
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(file);
    console.log(error);
  }
};

export default uploadOnCloud;
