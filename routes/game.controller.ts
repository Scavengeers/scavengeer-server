import express, { Request, Response } from "express";
import GameSchema from "../routes/game.model";
import multer from "multer";
import mongoose, { isObjectIdOrHexString, isValidObjectId } from "mongoose";
const ObjectID = require("mongodb").ObjectId;

//hi
//get request
const getGame = async (req: Request, res: Response) => {
  console.log("getGame")
  const getResult = await GameSchema.find({});
  res.status(200).send(getResult);
};

const getGameByUId = async (req: Request, res: Response) => {
  console.log("getGameByUId")
  const uId = req.params.uId;
  console.log(uId)
  const allGamesFromUId = await GameSchema.find(
    { uId: uId },
    {
      _id: 1,
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
  console.log("getPublicGames")
  try {
    const getResult = await GameSchema.find(
      { isPublished: true, isPrivate: false },
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
  console.log('this is running')
  const id = req.params._id;
  try {
    const getResult = await GameSchema.find(
      { _id: id, isPublished: true, isPrivate: false },
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
  console.log('getGamesForEditor')
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
  console.log("hello world!!!!!")
  const id = req.params._id;
  const index: number = parseInt(req.query.index as string);
  console.log(index)
    try {
      const getResult = await GameSchema.find(
        { _id: id },
        { gameModules: 1 }
       ).then((data) => data[0]["gameModules"]);
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
