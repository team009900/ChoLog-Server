import { Request, Response, NextFunction } from "express";

const get = (req: Request, res: Response, next: NextFunction): void => {
  const a = 1;
};

const post = (req: Request, res: Response, next: NextFunction): void => {
  const a = 1;
};

export { get, post };
