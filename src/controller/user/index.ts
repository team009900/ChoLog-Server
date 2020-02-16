import { Request, Response, NextFunction } from "express";

const get = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  res.json(`user get. userId: ${userId}`);
};

const patch = (req: Request, res: Response, next: NextFunction): void => {
  res.json("user patch");
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  res.json("user delete");
};

const plantGet = (req: Request, res: Response, next: NextFunction): void => {
  res.json("User's plants get.");
};

export { get, plantGet, patch, remove as delete };
