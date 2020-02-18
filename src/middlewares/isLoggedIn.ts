import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Blacklist from "../entity/Blacklist";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    // 블랙리스트 토큰인 지 확인한다.
    const token = req.headers.authorization;
    const blacklistToken = await Blacklist.findByToken(token);

    try {
      if (blacklistToken) {
        res.status(401).json("토큰 유효기간이 만료되었습니다. 다시 로그인 해주세요.");
        return;
      }
    } catch (error) {
      res.status(400).json(error);
      return;
    }

    const jwtSecret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";

    const decoded: any = jwt.verify(token.substring(7), jwtSecret);
    (<any>req).decoded = decoded; // next에서 decoded된 값들을 사용할 수 있게 저장

    next();
  } else {
    res.status(403).send("로그인 해주세요");
  }
};

// passport.authenticate("jwt", { session: false })
