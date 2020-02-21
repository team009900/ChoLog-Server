import { Request, Response, NextFunction } from "express";
import Parameter from "../../entity/Parameter";
import postPlant from "./postPlant";
import getPlant from "./getPlant";

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allParameters: Parameter[] = await Parameter.find();
    res.status(200).json(allParameters);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error name: ${error.name}`);
  }
};

export { postPlant, getPlant, getAll };
