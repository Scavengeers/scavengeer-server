import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const { editGame, createGame, deleteGame, editVisibility } = require("./routes/editor.controller");
const { createSession, getSession, updateSession } = require("./routes/session.controller")
const {
  getGamesById,
  getGameModule,
  getPublicGames,
  getGameForEditor,
  getGame,
  getGameByUId
} = require("./routes/game.controller");

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();

  //middlewares
  app.use(cors());
  app.use(express.json());

  app.patch("/editor/:_id", editGame);
  app.patch("/updateSession/:gameId/:uId", updateSession)
  app.post("/editor", createGame);
  app.delete("/editor/:_id", deleteGame);
  app.get("/findsession/:_id/:uId", getSession)
  app.get("/test", getGame);
  app.get("/", getPublicGames);
  app.get("/:_id", getGamesById);
  app.get("/editor/:uId", getGameByUId);
  app.get("/editor/:_id/edit", getGameForEditor);
  app.get("/game/:_id/:index?", getGameModule);

  //mongoose connection
  mongoose.connect(uri);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Hello from mongoDB");
  });

  return app;
};

export default setupServer;
