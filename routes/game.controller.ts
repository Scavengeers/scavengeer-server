import express, { Request, Response } from "express";
import GameSchema from "../routes/game.model";
import multer from "multer";
import mongoose, { isObjectIdOrHexString, isValidObjectId } from "mongoose";
const ObjectID = require("mongodb").ObjectId;

//hi
//get request
const getGame = async (req: Request, res: Response) => {
  const getResult = await GameSchema.find({});
  res.status(200).send(getResult);
};

const getGameByUId = async (req: Request, res: Response) => {
  const uId = req.params.uId;
  const allGamesFromUId = await GameSchema.find(
    { uId: uId },
    {
      titleOfGame: 1,
      isPrivate: 1,
      isPublished: 1,
      dateCreated: 1,
      dateUpdated: 1,
    }
  )
  console.log(allGamesFromUId)
  res.status(200).send(allGamesFromUId);
};


const getPublicGames = async (req: Request, res: Response) => {
  try {
    const getResult = await GameSchema.find(
      { isPublished: "true", isPrivate: "false" },
      {
        titleOfGame: 1,
        description: 1,
        author: 1,
        rating: 1,
        gameImageURL: 1,
        estimatedTimeMinutes: 1,
        startingLocationCoordinates: 1,
      }
    );
    res.status(200).send(getResult);
  } catch(err) {
    res.send(err)
  }
};

const getGamesById = async (req: Request, res: Response) => {
  const id = req.query._id;
  try {
    console.log("this is running");
    const getResult = await GameSchema.find(
      { _id: id, isPublished: "true", isPrivate: "false" },
      {
        isPublished: 1,
        titleOfGame: 1,
        description: 1,
        author: 1,
        rating: 1,
        gameImageURL: 1,
        estimatedTimeMinutes: 1,
        startingLocationCoordinates: 1,
      }
    );
    res.status(200).send(getResult);
  } catch (err) {
    res.status(400).send(err);
  }
  //getResult.isPublished;
};
const getGameForEditor = async (req: Request, res: Response) => {
  const id = req.params._id;
  console.log(id)
  try {
    const getResult = await GameSchema.find({ _id: id });
    console.log(getResult)
    res.status(200).send(getResult);
  } catch (err) {
    res.status(400).send(err);
  }
  //getResult.isPublished;
};

const getGameModule = async (req: Request, res: Response) => {
  const id = req.params._id;
  const index: number = parseInt(req.query.index as string);
    try {
      const getResult = await GameSchema.find(
        { _id: id },
        { gameModules: 1 }
       ).then((data) => data[0]["gameModules"]);
       console.log(getResult)
        res.status(200).send(getResult[index]);
    } catch (err) {
      res.status(401).send(err);
  }
};


module.exports = {
  getPublicGames,
  getGamesById,
  getGameModule,
  getGameForEditor,
  getGame,
  getGameByUId
};
