import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
  const { plantsDBId } = req.params;
  res.json(`plantsDB get. plantsDBId: ${plantsDBId}`);
};
