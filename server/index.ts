import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import setupServer from "./server";

dotenv.config();

let server: Express = setupServer();
const port = process.env.PORT || 2000;

(() => {
  try {
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("server failed:" + err);
  }
})();
