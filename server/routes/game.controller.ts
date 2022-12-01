import express, { Request, Response } from "express";
const Game = require("./game.model");

const router = express.Router();

const postGame = async (req: Request, res: Response) => {
  console.log(req.body);
  let { titleOfGame, description, uId, isPrivate, gameModules } = req.body;
  try {
    const newGame = new Game({
      titleOfGame: titleOfGame,
      description: description,
      uId: uId,
      isPrivate: isPrivate,
      gameModules: gameModules,
    });
    const savedGame = await newGame.save();
    res.status(201).json({ success: true, data: savedGame });
  } catch (err) {
    res.status(409).json({ success: false, data: [], error: err });
  }
};

export default postGame;
