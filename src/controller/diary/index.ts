import { Request, Response, NextFunction } from "express";

const post = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`diary post. plantId: ${plantId}`);
};

const get = (req: Request, res: Response, next: NextFunction): void => {
  const { diaryId } = req.params;
  res.json(`diary get. diaryId: ${diaryId}`);
};

const patch = (req: Request, res: Response, next: NextFunction): void => {
  const { diaryId } = req.params;
  res.json(`diary patch. diaryId: ${diaryId}`);
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  const { diaryId } = req.params;
  res.json(`diary delete. diaryId: ${diaryId}`);
};

export { post, get, patch, remove as delete };
