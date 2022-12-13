import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import imageModule from "./routes/image.module";
import postPhoto from "./routes/image.controller";
const {
  postGame,
  getGamesById,
  getGameModule,
  editGame,
  getPublicGames,
} = require("./routes/game.controller");

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();
  // const Storage = multer.memoryStorage();
  // const upload = multer({ storage: Storage });

  //middlewares
  app.use(cors());
  app.use(express.json());
  app.patch("/editor/:_id?", editGame);
  app.post("/editor", postGame);
  app.get("/", getPublicGames);
  app.get("/:_id?", getGamesById);
  app.get("/game/:_id/:index?", getGameModule);

  //mongoose connection
  mongoose.connect(uri);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Hello from mongoDB");
  });

  //post request
  const Storage = multer.memoryStorage();
  const upload = multer({ storage: Storage });

  return app;
};

export default setupServer;
