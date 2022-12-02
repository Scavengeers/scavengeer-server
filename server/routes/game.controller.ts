import express, { Request, Response } from "express";
import mongoose from "mongoose";
import GameSchema from "../routes/game.model";

//get request
const getAll = async (req: Request, res: Response) => {
  console.log("this is running");
  const allList = await GameSchema.find();
  res.status(200).json({ success: true, data: allList });
};

//post request
const postGame = async (req: Request, res: Response) => {
  //console.log(GameSchema);
  let { titleOfGame, description, uId, isPrivate, gameModules } = req.body;
  const newGame = new GameSchema({
    titleOfGame: titleOfGame,
    description: description,
    uId: uId,
    isPrivate: isPrivate,
    gameModules: gameModules,
  });
  const save = await newGame.save();
  res.status(201).json({ success: true, data: save });
};

module.exports = { postGame, getAll };
