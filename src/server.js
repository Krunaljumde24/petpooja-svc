const express = require("express");
const categoryRouter = require("./router/category-router");
const bodyParser = require("body-parser");
const userRoute = require("./router/user-router");
const cors = require("cors");

const mongooseConnection = require("./database/mongodb-connection");
const menuRouter = require("./router/menu-router");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/category", categoryRouter);
app.use("/user", userRoute);
app.use("/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

const port = process.env.PORT || 8090;

app.listen(port, () => {
  console.log("Server is running on port 8090.");
});
