const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

let updateImageToCloudinary = async (file, path, name) => {
  try {
    let data = await cloudinary.uploader.upload(file, {
      folder: path,
      public_id: name,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = updateImageToCloudinary;
