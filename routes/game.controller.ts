import express, { Request, Response } from "express";
import GameSchema from "../routes/game.model";
import multer from "multer";
import mongoose, { isObjectIdOrHexString, isValidObjectId } from "mongoose";
const ObjectID = require("mongodb").ObjectId;

//hi
//get request
const getPublicGames = async (req: Request, res: Response) => {
  const getResult = await GameSchema.find(
    { isPublished: true, isPrivate: false },
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
};

const getGamesById = async (req: Request, res: Response) => {
  const id = req.query._id;
  const getResult = await GameSchema.find(
    { _id: id, isPublished: true, isPrivate: false },
    {
      isPublished: 1,
      titleOfGame: 1,
      description: 1,
      author: 1,
      rating: 1,
      image: 1,
      estimatedTimeMinutes: 1,
      startingLocationCoordinates: 1,
    }
  );
  //getResult.isPublished;
  res.status(200).send(getResult);
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
  const payload = JSON.parse(JSON.stringify(req.body));
  console.log(req.body);
  let {
    isPublished,
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
      isPublished,
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
    res.status(201).json({ success: true, data: save._id });
  } catch (err) {
    res.status(401).send(err);
  }
};

//patch request
const editGame = async (req: Request, res: Response) => {
  const updates = req.body;
  const id = req.params._id;

  if (isValidObjectId(req.params._id)) {
    try {
      await GameSchema.updateOne(
        {
          _id: id,
        },
        { $set: updates }
      ).then((result) => {
        res.status(200).json(result);
      });
    } catch (err) {
      res.status(401).json({ error: err });
    }
  }
};

module.exports = {
  postGame,
  getPublicGames,
  getGamesById,
  getGameModule,
  editGame,
};
