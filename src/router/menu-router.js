const express = require("express");
const { default: mongoose } = require("mongoose");
const menuRouter = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const menuSchema = mongoose.Schema({
  item: String,
  category: String,
  description: String,
  type: String,
  price: Number,
  rating: Number,
  image: {
    fileName: String,
    data: Buffer,
    contentType: String,
    size: Number,
  },
});

const MenuModel = mongoose.model("Menu", menuSchema);

// get-all-menu
menuRouter.get("/get-all-menu", async (req, res) => {
  const result = await MenuModel.find();
  res.json(result);
});

// /add-menu-item

menuRouter.post("/add-menu-item", upload.single("menuImage"), (req, res) => {
  let reqBody = req.body;

  let menuImage = req.file;

  console.log(menuImage);

  if (reqBody && Object.keys(reqBody).length != 0) {
    const obj = new MenuModel({
      category: reqBody.category,
      item: reqBody.item,
      description: reqBody.description,
      price: reqBody.price,
      type: reqBody.type,
      rating: reqBody.rating,
      image: {
        fileName: menuImage.originalname,
        data: menuImage.buffer,
        contentType: menuImage.contentType,
        size: menuImage.size,
      },
    });
    // insert document
    obj.save();

    res.status(201).send("Menu Added.");
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
