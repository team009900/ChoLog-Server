import { Request, Response, NextFunction } from "express";
import Blacklist from "../entity/Blacklist";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    // 블랙리스트 토큰인 지 확인한다.
    const token = req.headers.authorization;
    await Blacklist.findByToken(token)
      .then((result) => {
        if (result) {
          res
            .status(401)
            .json("토큰 유효기간이 만료되었습니다. 다시 로그인 해주세요.");
          // .redirect("/login");
        }
      })
      .catch((err) => res.status(400).json(`Error name: ${err.name}`));

    next();
  } else {
    res
      .status(403)
      .send("로그인 필요")
      .redirect("/login");
  }
};

// passport.authenticate("jwt", { session: false })
