const express = require("express");
const categoryRouter = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const categorySchema = new mongoose.Schema({
  name: String,
  image: {
    fileName: String,
    data: Buffer,
    contentType: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

categoryRouter.post("/add-category", upload.single("catImage"), (req, res) => {
  let reqBody = req.body;
  console.log(reqBody);
  console.log(req.file);

  // if (reqBody && Object.keys(reqBody).length != 0) {
  // } else {
  //   res.status(400).send("Please send valid category details.");
  // }

  // const obj = new Category({ name: category });
  res.status(201).send("Category Added.");

  // if (error.errmsg && error.errmsg.includes("duplicate key error")) {
  //   res.status(500).send("Duplicate category found!");
  //   res.status(500).send("Failed to add category.");
  // }
});

categoryRouter.get("/get-category", async (req, res) => {
  const result = await Category.find({}, { _id: 0, name: 1 });

  const categories = [];
  result.map((cat) => {
    categories.push(cat.name);
  });
  res.json(categories);
});

module.exports = categoryRouter;
