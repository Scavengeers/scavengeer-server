import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import imageModule from "./routes/image.module";
import postPhoto from "./routes/image.controller";
const { postGame, getAll, getGamesById } = require("./routes/game.controller");

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();
  // const Storage = multer.memoryStorage();
  // const upload = multer({ storage: Storage });

  //middlewares
  app.use(cors());
  app.use(express.json());
  // app.post("/upload");
  app.post("/edit", postGame);
  app.get("/test", getAll);
  app.get("/:uId?", getGamesById);
  //app.post("/upload", upload.single("image"), postPhoto);

  //mongoose connection
  mongoose.connect(uri);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Hello from mongoDB");
  });

  //post request
  const Storage = multer.memoryStorage();
  const upload = multer({ storage: Storage });

  app.post("/test", (req: Request, res: Response) => {
    console.log(req.body);
  });

  return app;
};

export default setupServer;
