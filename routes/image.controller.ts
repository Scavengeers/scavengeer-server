import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import multer from "multer";
import imageModule from "./image.module";

//post request
const Storage = multer.memoryStorage();
const upload = multer({ storage: Storage });

const postPhoto = (req: Request, res: Response) => {
  upload.single("image"),
    async (req: Request, res: Response) => {
      const payload = JSON.parse(JSON.stringify(req.body));
      const data = req.file?.buffer;
      const name = req.file?.originalname;
      const contentType = req.file?.mimetype;

      const postObj = {
        answer: payload.answer,
        img: {
          data: data,
          name: name,
          contentType: contentType,
        },
      };
      console.log(req.file);

      try {
        const newGameModule = new imageModule({
          img: postObj,
        });
        const saveImage = await newGameModule.save();
        res.status(201).json({ success: true, data: saveImage });
      } catch (err) {
        res.status(401).send(err);
      }
    };
};

export default { postPhoto };
