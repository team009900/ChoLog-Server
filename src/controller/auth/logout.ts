import { Request, Response, NextFunction } from "express";
import Blacklist from "../../entity/Blacklist";
import User from "../../entity/User";

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;

    Blacklist.createToken(token)
      .then(() => res.status(200).json("성공적으로 로그아웃 되었습니다"))
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};
