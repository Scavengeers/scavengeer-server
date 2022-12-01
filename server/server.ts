const express = require("express");
const mongoose = require("mongoose");
const Game = require("./model/game");
require("dotenv").config();

const uri = process.env.MONGO_URI;

function setupServer() {
  const app = express();

  //middlewares
  app.use(express.json());

  //mongoose connection
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Hello from mongoDB");
  });

  return app;
}

module.exports = setupServer;
