import { Request, Response, NextFunction } from "express";
import { Diary } from "../../entity";
import { diaryFormatting } from "../../services";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { diaryId } = req.params;
    console.log("diary GET", { diaryId });

    const findDiary: Diary | undefined = await Diary.findOne(
      { id: Number(diaryId) },
      { relations: ["states", "plant", "states.parameter", "weather"] },
    );

    if (findDiary === undefined) {
      res.status(404).json(`Invalid diary id: ${diaryId}`);
      return;
    }

    // console.log(findDiary);
    res.status(200).json(diaryFormatting(findDiary));
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};
