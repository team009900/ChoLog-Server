import { Request, Response, NextFunction } from "express";
import Plant from "../../entity/Plant";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { plantId } = req.params;
  if (!Number(plantId)) {
    res.status(400).json("You send us bad request");
  }

  try {
    const findPlant = await Plant.findOne({ where: [{ id: plantId }], relations: ["parameters"] });
    if (findPlant === undefined) {
      res.status(404).json(`Plant ${plantId} does not exist`);
      return;
    }

    res.status(200).json(findPlant.parameters);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error: ${error}`);
  }
};
