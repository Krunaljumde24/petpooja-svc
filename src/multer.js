const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// encode username & password with encodeURIComponent
const username = encodeURIComponent("krunaljumde");
const password = encodeURIComponent("Monu@2000");

// concatinate all the rquired fields in uri
const url = `mongodb+srv://${username}:${password}@devspace-mongodb-cluste.e3zikt5.mongodb.net/petpooja?retryWrites=true&w=majority&appName=devspace-mongodb-cluster`;

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
      };
    } else {
      return `${Date.now()}_${file.originalname}`;
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
