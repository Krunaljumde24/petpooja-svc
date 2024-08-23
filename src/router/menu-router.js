const express = require("express");
const { default: mongoose } = require("mongoose");
const menuRouter = express.Router();
const updateImageToCloudinary = require("../services/cloudinary");

let assetPath = "DevSpace/petpooja/menus";

const menuSchema = mongoose.Schema({
  item: String,
  category: String,
  description: String,
  type: String,
  price: Number,
  rating: Number,
  imageURL: String,
});

const MenuModel = mongoose.model("Menu", menuSchema);

// get-all-menu
menuRouter.get("/get-all-menu", async (req, res) => {
  const result = await MenuModel.find();
  res.json(result);
});

menuRouter.post("/add-menu-item", async (req, res) => {
  let reqBody = req.body;
  if (reqBody && Object.keys(reqBody).length != 0) {
    let result = await MenuModel.find({
      item: reqBody.item,
      category: reqBody.category,
    });
    if (result && Object.keys(result).length > 0) {
      res.status(400).send("Menu already exists.");
    } else {
      try {
        let uploadObj = updateImageToCloudinary(
          reqBody.image,
          "",
          reqBody.item
        );

        const obj = new MenuModel({
          category: reqBody.category,
          item: reqBody.item,
          description: reqBody.description,
          price: reqBody.price,
          type: reqBody.type,
          rating: reqBody.rating,
          imageURL: uploadObj.url,
        });
        obj.save();
        res.status(201).send("Menu Added.");
      } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong.");
      }
    }
  } else {
    res.status(400).send("Please send valid menu details.");
  }
});

menuRouter.get("/get-item-by-name", async (req, res) => {
  let query = req.query;
  if (query && Object.keys(query).length > 0) {
    try {
      let result = await MenuModel.find(
        { category: query.category },
        { __v: 0, _id: 0 }
      );
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong!");
    }
  } else {
    res.status(400).send("Please send valid menu details.");
  }
});

menuRouter.put("/update-menu-by-name", (req, res) => {
  let reqBody = req.body;

  if (reqBody && Object.keys(reqBody).length != 0) {
    // update the record on the basis of menu name
    MenuModel.findOneAndUpdate(
      { item: reqBody.item },
      {
        description: reqBody.description,
      }
    )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    res.send("Menu Edited");
  } else {
    res.status(400).send("Please send valid menu details.");
  }
});

module.exports = menuRouter;
