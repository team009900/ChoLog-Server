import { Request, Response, NextFunction } from "express";
import verifyToken from "./verifyToken";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.token) {
    verifyToken(req, res, next);
  } else {
    res.status(403).send("로그인 필요");
  }
};
