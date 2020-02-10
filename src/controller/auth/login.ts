import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import User from "../../entity/User";

// passport.authenticate('local') 미들웨어가 로컬 로그인을 수행.
export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    async (authError: any, user: any, info: any) => {
      try {
        const { email } = req.body;
        const exUser = await User.findByEmail(email);
        if (exUser === undefined) {
          next(authError);
          return;
        }
        if (authError || !user) {
          next(authError);
          return;
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret === undefined) {
          next(new Error("Empty Secret"));
          return;
        }

        req.login(user, { session: false }, async (loginError) => {
          if (loginError) return next(loginError);

          const token = jwt.sign(
            {
              id: exUser.id,
              name: exUser.username,
            },
            jwtSecret,
            {
              expiresIn: "1d",
              issuer: "009900",
            },
          );
          res.cookie("token", token);
          return res.json({ id: user.id, name: user.name, email: user.email });
        });
      } catch (error) {
        res.status(400).send(error);
      }
    },
  )(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
};
