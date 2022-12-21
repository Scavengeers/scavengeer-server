import express, { Request, Response } from "express";
import GameSchema from "../routes/game.model";

const createGame = async (req: Request, res: Response) => {
  console.log(req.body)
  let {
    _id,
    isPublished,
    titleOfGame,
    description,
    uId,
    author,
    rating,
    gameImageURL,
    estimatedTimeMinutes,
    isPrivate,
    gameModules,
    startingLocationCoordinates,
  } = req.body;

  try {
    const newGame = new GameSchema({
      _id,
      isPublished,
      titleOfGame,
      description,
      uId,
      author,
      rating,
      gameImageURL,
      estimatedTimeMinutes,
      isPrivate,
      gameModules,
      startingLocationCoordinates,
    });
    const save = await newGame.save();
    res.status(201).send(save);
  } catch (err) {
    res.status(401).send(err);
  }
};

//patch request
const editGame = async (req: Request, res: Response) => {
  const updates = req.body;
  const gameData = await GameSchema.findById(req.params._id)

  if(!gameData) return res.status(404).send("The game does not exist");

  try {
    await GameSchema.updateOne(
      {
        _id: req.params._id,
      },
      { $set: updates }
    ).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const editVisibility = async (req: Request, res: Response) => {
  const updates = req.body;
  const gameData = await GameSchema.findById(req.params._id)

  if(!gameData) return res.status(404).send("The game does not exist");

  try {
    await GameSchema.updateOne(
      {
        _id: req.params._id,
      },
      { $set: updates }
    ).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteGame = async (req: Request, res: Response) => {
  const gameToDelete = await GameSchema.findById(req.params._id);

  if(!gameToDelete) return res.status(500).send("Not a valid document id");

  try {
    await GameSchema.deleteOne({
      _id: req.params._id
    }).then(result => {
      res.status(200).json(result);
    })
  }catch(err) {
    res.status(500).json({error: 'Could not delete the document'})
  }

}

module.exports = {
  createGame,
  editGame,
  deleteGame
};
