import { Request, Response, NextFunction } from "express";

const post = (req: Request, res: Response, next: NextFunction): void => {
  res.json("plant post");
};

const get = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant get. plantId: ${plantId}`);
};

const patch = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant patch. plantId: ${plantId}`);
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant delete. plantId: ${plantId}`);
};

export { post, get, patch, remove as delete };
