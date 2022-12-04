import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
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
  const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({
    storage: Storage,
  }).single("testImage");

  app.post("/upload", async (req: Request, res: Response) => {
    const { typeOfModule, title, description, answer } = req.body;
    console.log("This is the body you got:", req.body);
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newGameModule = new gameModules({
          typeOfModule: typeOfModule,
          title: title,
          description: description,
          answer: answer,
          img: {
            data: req.body.filename,
            contentType: "image/png",
          },
        });
        newGameModule
          .save()
          .then(() => res.send(newGameModule + " has been uploaded!"))
          .catch((err: any) => console.error(err));
      }
    });
  });

  app.post("/test", (req: Request, res: Response) => {
    console.log(req.body);
  });

  return app;
};

export default setupServer;
