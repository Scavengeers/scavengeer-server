import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import multer from "multer";
import gameModules from "./routes/gamemodule";
const { postGame, getAll, getGamesById } = require("./routes/game.controller");

dotenv.config();
const uri = process.env.MONGO_URI;

const setupServer: Function = () => {
  const app: Express = express();

  //middlewares
  app.use(cors());
  app.use(express.json());
  // app.post("/upload");
  app.post("/edit", postGame);
  app.get("/test", getAll);
  app.get("/:uId?", getGamesById);

  //mongoose connection
  mongoose.connect(uri);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Hello from mongoDB");
  });

  //post request
  const Storage = multer.memoryStorage();
  const upload = multer({ storage: Storage });

  app.post(
    "/upload",
    upload.single("image"),
    async (req: Request, res: Response) => {
      //console.log(req.body);
      const payload = JSON.parse(JSON.stringify(req.body));
      const data = req.file?.buffer;
      const name = req.file?.originalname;
      const contentType = req.file?.mimetype;
      const image = {
        data: data,
        name: name,
        contentType: contentType,
      };
      //console.log(image);
      // console.log("😭", data);
      // console.log("😡", name);
      // console.log("🥺", contentType);

      try {
        const newGameModule = new gameModules({
          typeOfModule: payload.typeOfModule,
          title: payload.title,
          description: payload.description,
          answer: payload.answer,
          img: image,
        });
        console.log(newGameModule);
        // const saveImage = await newGameModule.save();
        //console.log(newGameModule);
        // res.status(201).json({ success: true, data: saveImage });
      } catch (err) {
        res.status(401).send(err);
      }
    }
  );

  app.post("/test", (req: Request, res: Response) => {
    console.log(req.body);
  });

  return app;
};

export default setupServer;
