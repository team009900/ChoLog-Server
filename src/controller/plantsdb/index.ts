import { Request, Response, NextFunction } from "express";

const getSearch = (req: Request, res: Response, next: NextFunction): void => {
  const { q: target } = req.query;
  res.json(`plantsDB search. target: ${target}`);
};

const get = (req: Request, res: Response, next: NextFunction): void => {
  const { plantsDBId } = req.params;
  res.json(`plantsDB get. plantsDBId: ${plantsDBId}`);
};

export { getSearch, get };
