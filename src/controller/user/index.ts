import { Request, Response, NextFunction } from "express";
import { hashSync } from "bcryptjs";
import "dotenv/config";

import User from "../../entity/User";
import { userUpdateType } from "../../@types/entity";
import Plant from "../../entity/Plant";
import { deleteImg } from "../../services";

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

const patch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleteImgQuery = req.query["img-del"];
    if (deleteImgQuery !== "true" && deleteImgQuery !== "false" && deleteImgQuery !== undefined) {
      res.status(400).json("You send us invalid request");
      return;
    }
    const isDeleteImg: boolean = deleteImgQuery === "true";
    const multerS3: any = req.file;
    let image: string | undefined;
    if (multerS3) {
      image = multerS3.location;
    }

    const { id } = (<any>req).decoded; // user id 가져옴
    console.log((<any>req).decoded);
    const { username, commentAllow, open } = req.body;
    let { password } = req.body;

    //! password hashing
    if (password) {
      password = hashSync(password, 12);
    }

    const userData: userUpdateType = { username, password, image, commentAllow, open };

    //! body로 입력되지 않은 데이터의 key value쌍 삭제
    const userDataKeys: string[] = Object.keys(userData);
    userDataKeys.forEach((key: string) => {
      if (userData[key] === undefined) {
        delete userData[key];
      }
    });

    if (isDeleteImg) {
      const findUser = await User.findOne({ id });
      // console.log(findUser);
      if (findUser === undefined) {
        res.status(404).json("invalid user");
        return;
      }
      await deleteImg(findUser.image);
      userData.image = undefined;
    }

    //! 유저정보 수정
    const updatedUser = await User.updateUser(id, userData);

    if (updatedUser === undefined) {
      res.status(404).json("invalid user");
      return;
    }

    // console.log(result);
    res.json("Modified successfully!");
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = (<any>req).decoded;
    const findUser = await User.findOne({ id });

    if (findUser) {
      const deletedUser = await User.remove(findUser);
      if (deletedUser) {
        res.status(204).json();
        return;
      }
    }
    res.status(404).json("You are not exist");
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};

const plantsGet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = (<any>req).decoded;

    const findUser = await User.findOne({ id }, { relations: ["plants"] });
    // console.log(findUser);

    if (findUser === undefined) {
      res.status(404).json("Not exist user");
      return;
    }

    if (findUser.plants === undefined) {
      res.status(200).json([]);
      return;
    }

    let { plants } = findUser;
    plants = plants.map((plant: Plant) => {
      const tmpPlant: Plant = plant;
      delete tmpPlant.plantName;
      delete tmpPlant.scientificName;
      delete tmpPlant.memo;
      delete tmpPlant.advice;
      delete tmpPlant.updatedAt;
      delete tmpPlant.createdAt;

      return tmpPlant;
    });

    res.status(200).json(plants);
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};

export { get, plantsGet, patch, remove as delete };
