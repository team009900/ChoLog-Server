import { Request, Response, NextFunction } from "express";
import postPlant from "./postPlant";
import patchPlant from "./patchPlant";
import getPlant from "./getPlant";

const getAll = (req: Request, res: Response, next: NextFunction): void => {
  res.json("all parameters get.");
};

export { postPlant, getPlant, getAll, patchPlant };
