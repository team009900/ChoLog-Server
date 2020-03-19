import { Request, Response, NextFunction } from "express";
import Weather from "../../entity/Weather";

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allWeathers: Weather[] = await Weather.find();
    res.status(200).json(allWeathers);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error name: ${error.name}`);
  }
};

export default get;
