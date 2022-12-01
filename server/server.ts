import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postGame from "./routes/game.controller";

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();

  //middlewares
  app.use(express.json());
  app.use("/edit", postGame);

  //mongoose connection
  mongoose.connect(uri);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Hello from mongoDB");
  });

  return app;
};

export default setupServer;
