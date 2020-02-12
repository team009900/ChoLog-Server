import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    next();
  } else {
    res.status(403).send("로그인 되어 있음");
  }
};
