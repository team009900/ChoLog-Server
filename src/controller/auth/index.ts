import { Request, Response } from "express";
import login from "./login";
import signup from "./signup";
import logout from "./logout";
import User from "../../entity/User";

const get = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  if (username === undefined) {
    res.status(400).json("You send bad request");
    return;
  }

  const findUser = await User.findOne({ username });
  if (findUser) {
    res.status(422).json("This username is already exist");
    return;
  }
  res.status(200).json("Not exist username");
};

export { signup, login, logout, get };
