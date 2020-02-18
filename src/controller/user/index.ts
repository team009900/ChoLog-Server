import { Request, Response, NextFunction } from "express";
import "dotenv/config";

import User from "../../entity/User";

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  // console.log(userId);
  if (!Number(userId)) {
    // userId가 숫자가 아닐 때
    res.status(400).json("You send us bad request");
    return;
  }
  try {
    const findUser = await User.findOne({ where: { id: userId }, relations: ["plants"] });

    if (findUser === undefined) {
      res.status(404).json(`user ${userId} does not exist`);
      return;
    }

    const {
      id,
      email,
      username,
      image,
      snsId,
      provider,
      commentAllow,
      open,
      reports,
      banned,
      seed,
      createdAt,
    } = findUser;
    const myPlantsCount = findUser.plants.length;
    res.status(200).json({
      id,
      email,
      username,
      image,
      snsId,
      provider,
      commentAllow,
      open,
      reports,
      banned,
      seed,
      createdAt,
      myPlantsCount,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};

const patch = (req: Request, res: Response, next: NextFunction): void => {
  let deleteImg = req.query["img-del"];
  if (deleteImg !== "true" && deleteImg !== "false") {
    res.status(400).json("You send us invalid request");
    return;
  }
  deleteImg = Boolean(deleteImg);
  const multerS3: any = req.file;
  let image: string;
  if (multerS3) {
    image = multerS3.location;
  }

  console.log((<any>req).decoded);
  // console.log("file location", multerS3.location);
  res.json("user patch");
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const token = req.headers.authorization?.substring(7);
    // console.log({ token });
    if (token === undefined) {
      return res.status(400).json("plz send authorization");
    }

    const { id } = (<any>req).decoded;
    const findUser = await User.findOne({ id });

    if (findUser) {
      const deletedUser = await User.remove(findUser);
      if (deletedUser) {
        return res.status(204).json();
      }
    }
    return res.status(404).json("You are not exist");
  } catch (err) {
    console.error(err);
    return res.status(400).json(`Error name: ${err.name}`);
  }
};

const plantsGet = (req: Request, res: Response, next: NextFunction): void => {
  res.json("User's plants get.");
};

export { get, plantsGet, patch, remove as delete };
