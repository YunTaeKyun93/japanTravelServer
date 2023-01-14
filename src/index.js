require('dotenv').config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const router = require("./routers");

const main = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.mongoDbAddr);

  const app = express();
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.listen(config.port, () => {
    console.log(`Listening on ${config.port}`);
  });
  app.use(express.static("public", { extensions: ["html"] }));
  app.use(router);
};
main();
