import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const { postGame, getAll } = require("./routes/game.controller");
const GameSchema = require("./routes/game.model");

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();

  //middlewares
  app.use(express.json());
  app.post("/edit", postGame);
  app.get("/test", getAll);

  //mongoose connection
  mongoose.connect(uri);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Hello from mongoDB");
  });

  return app;
};

export default setupServer;
