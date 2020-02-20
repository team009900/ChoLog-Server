import { Request, Response, NextFunction } from "express";
import { Diary } from "../../entity";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const diaryId = Number(req.params.diaryId);
    if (!diaryId) {
      // diaryId가 숫자가 맞는지 확인
      res.status(400).json("invalid query");
      return;
    }

    const findDiary = await Diary.findOne({ id: diaryId });

    if (findDiary) {
      const deletedDiary = await Diary.remove(findDiary);
      if (deletedDiary) {
        res.status(204).json();
        return;
      }
    }

    res.status(404).json("invalid diary");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json(`Error name: ${err.name}`);
  }
};
