import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
  const { diaryId } = req.params;
  res.json(`diary patch. diaryId: ${diaryId}`);
};
