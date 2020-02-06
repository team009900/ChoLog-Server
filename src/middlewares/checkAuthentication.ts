import { Request, Response, NextFunction } from "express";

export = (req: Request, res: Response, next: NextFunction): void => {
  next();
};
