import { Request, Response, NextFunction } from "express";
import Blacklist from "../entity/Blacklist";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    next();
  } else if (req.headers.authorization) {
    const token = req.headers.authorization;
    const blacklistToken = await Blacklist.findByToken(token);

    try {
      if (blacklistToken) {
        next();
        return;
      }
      res.status(403).json("이미 로그인 되어 있습니다."); // 토큰이 있지만 블랙리스트가 아닐 때
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
