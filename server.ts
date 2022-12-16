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
  getGameByUId
  
} = require("./routes/game.controller");
const { editGame, createGame, deleteGame } = require("./routes/editor.controller");

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();

  //middlewares
  app.use(cors());
  app.use(express.json());

  app.patch("/editor/:_id", editGame);
  app.post("/editor", createGame);
  app.delete("/editor/:_id", deleteGame);
  app.get("/test", getGame);
  app.get("/", getPublicGames);
  app.get("/:_id", getGamesById);
  app.get("/editor/:uId?", getGameByUId);
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
