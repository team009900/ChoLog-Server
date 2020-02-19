import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`diary post. plantId: ${plantId}`);
};
