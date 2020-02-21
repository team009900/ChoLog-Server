import { Request, Response, NextFunction } from "express";
import { PlantsDatabase } from "../../entity";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q: target } = req.query;
    console.log(`plantsDB search. target: ${typeof target} ${target}`);
    if (target === undefined) {
      res.status(400).json("Plz send query");
      return;
    }

    const dataList = await PlantsDatabase.findPlantsDataList(target);
    // console.log(dataList);
    res.json(dataList);
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};
