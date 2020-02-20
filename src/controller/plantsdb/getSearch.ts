import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
  const { q: target } = req.query;
  res.json(`plantsDB search. target: ${typeof target} ${target}`);
};
