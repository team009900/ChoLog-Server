import { Request, Response, NextFunction } from "express";

const post = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant parameters post. plantId: ${plantId}`);
};

const get = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant parameters get. plantId: ${plantId}`);
};

const patch = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant parameters patch. plantId: ${plantId}`);
};

export { post, get, patch };
