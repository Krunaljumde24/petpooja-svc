// const express = require("express");
// const { default: mongoose } = require("mongoose");
// const multer = require("multer");
// const testRouter = express.Router();
// const memStorage = multer.memoryStorage();
// const upload = multer({ storage: memStorage });
// const updateImageToCloudinary = require("../services/cloudinary");
// const Category = require("../model/category");

// let catSchema = mongoose.Schema({
//   name: String,
//   image: {
//     fileName: String,
//     data: Buffer,
//     contentType: String,
//     size: Number,
//   },
// });

// let CatModel = mongoose.model("TestCategory", catSchema);

// testRouter.post("/add-category", upload.single("image"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   let imgFile = req.file;
//   try {
//     let obj = new CatModel({
//       name: req.body.name,
//       image: {
//         fileName: imgFile.filename,
//         data: imgFile.buffer,
//         contentType: imgFile.contentType,
//         size: imgFile.size,
//       },
//     });

//     await obj.save();
//     res.status(201).send("Category Added!");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Failed to add category.");
//   }
// });

// testRouter.get("/error", (req, res) => {
//   res.status(500).send("Internal server error.");
// });

// testRouter.post("/upload-image", (req, res) => {
//   let { name, image } = req.body;
//   let path = "DevSpace/Petpooja";
//   try {
//     let data = updateImageToCloudinary(image, path, name);

//     // data.secure_url; -> save this url in mongodb

//     res.status(201).send("Image uploaded.");
//   } catch (error) {
//     res.status(500).send("Failed to upload image due to some internal error.");
//   }
// });

// module.exports = testRouter;
