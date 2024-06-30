const express = require("express");
const categoryRouter = express.Router();
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model("Category", categorySchema);

categoryRouter.get("/add-category", (req, res) => {
  const category = req.query.name;
  if (!category || category === "") {
    res.status(400).send("Please send valid category name.");
  } else {
    const obj = new Category({ name: category });
    obj
      .save()
      .then((record) => {
        console.log(record);
        res.status(201).send("Category Added.");
      })
      .catch((error) => {
        if (error.errmsg && error.errmsg.includes("duplicate key error")) {
          res.status(500).send("Duplicate category found!");
        } else {
          res.status(500).send("Failed to add category.");
        }
      });
  }
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
