import { Request, Response, NextFunction } from "express";
import * as plant from "./plant";

const get = (req: Request, res: Response, next: NextFunction): void => {
  res.json("all parameters get.");
};

export { get, plant };
