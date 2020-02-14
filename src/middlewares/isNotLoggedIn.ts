import { Request, Response, NextFunction } from "express";
import Blacklist from "../entity/Blacklist";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    next();
  } else if (req.headers.authorization) {
    const token = req.headers.authorization;

    await Blacklist.findByToken(token)
      .then((result) => {
        if (result) {
          res
            .status(401)
            .json("토큰 유효기간이 만료되었습니다. 다시 로그인 해주세요.");
          // .redirect("/login");
        } else {
          res.status(403).send("이미 로그인 되어 있습니다.");
        }
      })
      .catch((err) => res.status(400).json(`Error name: ${err.name}`));

    next();
  }
};
