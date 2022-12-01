import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
const setupServer = require("./server");

dotenv.config();

let server: Express = setupServer();

const port = process.env.PORT || 8080;

server.get("/", (req: Request, res: Response) => {
  res.send("The server is going completely :)");
});

server.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
