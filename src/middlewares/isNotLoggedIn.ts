import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import Blacklist from "../entity/Blacklist";
import "dotenv/config";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    next();
  } else if (req.headers.authorization) {
    const token = req.headers.authorization;
    const blacklistToken = await Blacklist.findByToken(token);

    if (blacklistToken) {
      // 블랙리스트 토큰이면 재로그인
      next();
      return;
    }

    try {
      const jwtSecret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
      const verifyToken = jwt.verify(token.substring(7), jwtSecret, (err, decoded) => {
        if (decoded) {
          return res.status(401).json("이미 로그인 되어 있습니다."); // 토큰 유효기간 안지났을 때
        }
        return next(); // 토큰 유효기간 지나면 재로그인
      });
    } catch (error) {
      console.error(error);
      res.status(401).json(`Error name: ${error.name}`);
    }
  }
};
