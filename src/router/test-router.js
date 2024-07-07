const express = require("express");
const { default: mongoose } = require("mongoose");
const multer = require("multer");

const testRouter = express.Router();

const memStorage = multer.memoryStorage();

const upload = multer({ storage: memStorage });

let catSchema = mongoose.Schema({
  name: String,
  image: {
    fileName: String,
    data: Buffer,
    contentType: String,
    size: Number,
  },
});

let CatModel = mongoose.model("TestCategory", catSchema);

testRouter.post("/add-category", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  let imgFile = req.file;
  try {
    let obj = new CatModel({
      name: req.body.name,
      image: {
        fileName: imgFile.filename,
        data: imgFile.buffer,
        contentType: imgFile.contentType,
        size: imgFile.size,
      },
    });

    await obj.save();
    res.status(201).send("Category Added!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to add category.");
  }
});

module.exports = testRouter;
