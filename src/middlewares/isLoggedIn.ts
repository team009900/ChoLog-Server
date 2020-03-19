import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Blacklist from "../entity/Blacklist";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      // 블랙리스트 토큰인 지 확인한다.
      const token = req.headers.authorization;
      const blacklistToken = await Blacklist.findByToken(token);

      if (blacklistToken) {
        res.status(401).json("토큰 유효기간이 만료되었습니다. 다시 로그인 해주세요.");
        return;
      }

      const jwtSecret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";

      const decoded: any = jwt.verify(token.substring(7), jwtSecret);
      (<any>req).decoded = decoded; // next에서 decoded된 값들을 사용할 수 있게 저장

      next();
    } else {
      res.status(403).send("로그인 해주세요");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json("토큰 유효기간이 만료되었습니다. 다시 로그인 해주세요.");
      return;
    }

    console.error(error);
    res.status(500).json(`Error name: ${error.name}`);
  }
};

// passport.authenticate("jwt", { session: false })
