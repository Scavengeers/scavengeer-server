import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
const {
  getGamesById,
  getGameModule,
  getPublicGames,
  getGameForEditor,
  getGame,
} = require("./routes/game.controller");
const { editGame, postGame } = require("./routes/editor.controller");

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();
  // const Storage = multer.memoryStorage();
  // const upload = multer({ storage: Storage });

  //middlewares
  app.use(cors());
  app.use(express.json());

  //publish button
  app.patch("/editor/:_id", editGame);
  //save button
  app.get("/test", getGame);
  app.post("/editor", postGame);
  app.get("/profile", getPublicGames);
  app.get("/:_id?", getGamesById);
  app.get("profile/:uId");
  app.get("/editor/:_id", getGameForEditor);
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
