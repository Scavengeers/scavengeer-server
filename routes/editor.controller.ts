import express, { Request, Response } from "express";
import GameSchema from "../routes/game.model";
import multer from "multer";
import mongoose, { isObjectIdOrHexString, isValidObjectId } from "mongoose";
const ObjectID = require("mongodb").ObjectId;

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
  editGame,
};
