const mongoose = require("mongoose");

// encode username & password with encodeURIComponent
const username = encodeURIComponent("krunaljumde");
const password = encodeURIComponent("Monu@2000");

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
