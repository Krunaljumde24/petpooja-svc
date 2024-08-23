const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// encode username & password with encodeURIComponent
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

// concatinate all the rquired fields in uri
const uri = `mongodb+srv://${username}:${password}@devspace-mongodb-cluste.e3zikt5.mongodb.net/petpooja?retryWrites=true&w=majority&appName=devspace-mongodb-cluster`;

// required options
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// connection establishment
const mongooseConnection = mongoose
  .connect(uri, clientOptions)
  .then((resp) => {
    console.log("MongoDB is connected.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongooseConnection;
