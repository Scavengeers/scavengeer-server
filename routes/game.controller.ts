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
  console.log("hello");
  const id = req.query._id;
  //console.log(req.query.params);
  try {
    const getResult = await GameSchema.find(
      { _id: id },
      {
        titleOfGame: 1,
        description: 1,
        author: 1,
        rating: 1,
        image: 1,
        estimatedTimeMinutes: 1,
        startingLocationCoordinates: 1,
      }
    );
    res.status(200).send(getResult);
  } catch (err) {
    res.status(401).send(err);
  }
};

const getGameModule = async (req: Request, res: Response) => {
  const id = req.params._id;
  const index: number = parseInt(req.query.index as string);
  if (index) {
    try {
      const getResult = await GameSchema.find(
        { _id: id },
        { gameModules: 1 }
      ).then((data) => data[0]["gameModules"]);
      res.status(200).send(getResult[index]);
    } catch (err) {
      res.status(401).send(err);
    }
  } else {
    try {
      const getResult = await GameSchema.find(
        { _id: id },
        { gameModules: 1 }
      ).then((data) => data[0]["gameModules"]);
      res.status(200).send(getResult[0]);
    } catch (err) {
      res.status(401).send(err);
    }
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
    image,
    estimatedTimeMinutes,
    isPrivate,
    gameModules,
    startingLocationCoordinates,
  } = req.body;

  try {
    const newGame = new GameSchema({
      titleOfGame,
      description,
      uId,
      author,
      rating,
      image,
      estimatedTimeMinutes,
      isPrivate,
      gameModules,
      startingLocationCoordinates,
    });
    const save = await newGame.save();
    res.status(201).json({ success: true, data: save });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = { postGame, getAll, getGamesById, getGameModule };