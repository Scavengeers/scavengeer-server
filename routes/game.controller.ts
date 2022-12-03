import express, { Request, Response } from "express";
import GameSchema from "../routes/game.model";

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
  const id = req.query._id;
  console.log(id);
  try {
    const getResult = await GameSchema.find({
      _id: id,
    });
    res.status(200).send(getResult);
  } catch (err) {
    res.status(401).send(err);
  }
};

//post request
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
    res.status(201).json({ success: true, data: save });
  } catch (err) {
    res.status(401).send("This is erroring");
  }
};

module.exports = { postGame, getAll, getGamesById };
