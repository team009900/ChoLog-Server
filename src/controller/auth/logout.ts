import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.status(204).json("로그아웃 완료");
};
