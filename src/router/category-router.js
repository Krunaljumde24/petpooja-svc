const express = require("express");
const categoryRouter = express.Router();
const mongoose = require("mongoose");
const updateImageToCloudinary = require("../services/cloudinary");

let assetPath = "DevSpace/petpooja/categories";

const categorySchema = new mongoose.Schema({
  name: String,
  imageURL: String,
});

const Category = mongoose.model("Category", categorySchema);

categoryRouter.post("/add-category", async (req, res) => {
  if (req.body && Object.keys(req.body).length != 0) {
    let { catName, catImage } = req.body;
    try {
      let resultCat = await Category.find({ name: catName });
      if (resultCat && Object.keys(resultCat).length > 0) {
        console.log(resultCat);
        res.status(400).send("Category already exists.");
      } else {
        let data = await updateImageToCloudinary(catImage, assetPath, catName);
        let obj = new Category({
          name: catName,
          imageURL: data.url,
        });
        obj.save();
        res.send("Category Added.");
      }
    } catch (error) {
      res.status(500).send("Something went wrong!");
    }
  } else {
    res.status(400).send("Please send valid category details.");
  }
});

categoryRouter.get("/get-category", async (req, res) => {
  const result = await Category.find({}, { _id: 0, name: 1, imageURL: 1 });
  res.json(result);
});

module.exports = categoryRouter;
