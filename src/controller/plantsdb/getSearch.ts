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

    const dataList: PlantsDatabase[] | undefined = await PlantsDatabase.findPlantsDataList(target);

    if (dataList === undefined) {
      res.status(500).json("server database error");
      return;
    }
    // console.log(dataList);
    res.json(dataList);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json(`Error name: ${err.name}`);
  }
};
