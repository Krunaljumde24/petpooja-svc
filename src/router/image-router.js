const express = require("express");
const { default: mongoose } = require("mongoose");
const imageRouter = express.Router();
const multer = require("multer");

const imageSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

imageRouter.post("/upload", upload.single("icon"), async (req, res) => {
  console.log(req.file);
  try {
    const newImage = new Image({
      name: req.body.name,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newImage.save();
    res.status(201).send("File uploaded");
  } catch (error) {
    res.status(500).send("Error uploading image.");
  }
});

module.exports = imageRouter;
