import express, { Request, Response } from "express";
import GameSchema from "../routes/game.model";
import multer from "multer";

//hi
//get request
const getAll = async (req: Request, res: Response) => {
  try {
    const allList = await GameSchema.find();
    res.status(200).json({ success: true, data: allList });
  } catch (err) {
    res.status(409).send(err);
  }
};

const getGamesById = async (req: Request, res: Response) => {
  const id = req.query.uId;
  console.log(id);
  try {
    const getResult = await GameSchema.find({
      uId: id,
    });
    res.status(200).send(getResult);
  } catch (err) {
    res.status(401).send(err);
  }
};

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

const postGame = async (req: Request, res: Response) => {
  let {
    titleOfGame,
    description,
    uId,
    author,
    rating,
    estimatedTimeMinutes,
    isPrivate,
    gameModules,
  } = req.body;

  try {
    //console.log(req.body);
    const newGame = new GameSchema({
      titleOfGame,
      description,
      uId,
      author,
      rating,
      estimatedTimeMinutes,
      isPrivate,
      gameModules,
    });
    const save = await newGame.save();
    //console.log("😣", newGame.author);
    res.status(201).json({ success: true, data: save });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = { postGame, getAll, getGamesById };
