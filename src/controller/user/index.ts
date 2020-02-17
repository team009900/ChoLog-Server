import { Request, Response, NextFunction } from "express";
import User from "../../entity/User";

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  // res.json(`user get. userId: ${userId}`);
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
    res.status(400).json(`error: ${err}`);
  }
};

const patch = (req: Request, res: Response, next: NextFunction): void => {
  res.json("user patch");
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  res.json("user delete");
};

export { get, patch, remove as delete };
