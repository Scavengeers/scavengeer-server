import express, { Express, Request, Response } from "express";

const setupServer: Function = () => {
  const app: Express = express();
  app.use(express.json());

  return app;
};

export default setupServer;
