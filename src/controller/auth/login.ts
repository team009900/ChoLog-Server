import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
// import * as jwtSecret from "../../../key";

// passport.authenticate('local') 미들웨어가 로컬 로그인을 수행.
export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    async (authError: any, user: any, info: any) => {
      try {
        if (authError || !user) {
          next(authError);
          return;
          // res.status(400).json({
          //   message: info ? info.message : "Login failed",
          //   user,
          // });
        }

        req.login(user, { session: false }, async (loginError) => {
          if (loginError) return next(loginError);
          // if (loginError) {
          //   res.status(400).send({ loginError });
          // }

          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
            },
            "jwtSecret",
            {
              expiresIn: "1d",
              issuer: "009900",
            },
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
          });

          // return res.status(200).json({
          //   id: user.id,
          //   username: user.username,
          //   email: user.email,
          // });
          return res.status(200).json({ user, token });
          // console.log({ user, token });
        });
      } catch (err) {
        res.status(400).send(err);
      }
    },
  )(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
};
