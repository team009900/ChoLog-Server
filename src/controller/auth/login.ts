import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import Users from "../../entity/users";

export default {
  post: async (req: Request, res: Response): Promise<Response> => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // eslint-disable-next-line max-len
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, "your_jwt_secret");
        return res.json({ user, token });
      });
    })(req, res);
  },
};
