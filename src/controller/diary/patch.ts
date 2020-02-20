import { Request, Response, NextFunction } from "express";
import { setImgDelQuery, removeNullKeys, deleteImg, diaryFormatting } from "../../services";
import { diaryUpdateType } from "../../@types/entity";
import { Diary } from "../../entity";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const diaryId: number = Number(req.params.diaryId);
    const { humidity, createdAt, note, weatherId, state, temperature } = req.body;

    const isDeleteImg: boolean | undefined = setImgDelQuery(req.query["img-del"]);
    if (isDeleteImg === undefined) {
      res.status(400).json("You send invalid request");
      return;
    }

    const multerS3: any = req.file;
    let image: string | undefined;
    if (multerS3) {
      image = multerS3.location;
    }

    let diaryData: diaryUpdateType = {
      humidity,
      createdAt,
      note,
      weatherId,
      state,
      temperature,
      image,
    };

    //! body로 입력되지 않은 데이터의 key value쌍 삭제
    diaryData = removeNullKeys(diaryData);
    // console.log("+++++diaryData", diaryData);

    //! 이미지삭제요청을 하거나 formData에 이미지가 있음
    if (isDeleteImg || image) {
      const findDiary = await Diary.findOne({ id: diaryId });
      if (findDiary === undefined) {
        res.status(404).json("invalid diary id");
        return;
      }
      await deleteImg(findDiary.image); // 원래 있던 S3이미지 삭제

      //! 이미지삭제 요청을 했지만 formData에 이미지가 있음
      if (isDeleteImg && image) {
        await deleteImg(image); // 새로 받은 S3이미지 삭제
      }

      //! 이미지 삭제 요청
      if (isDeleteImg) {
        diaryData.image = undefined;
      }
    }

    //! 일기정보 수정
    const updatedDiary = await Diary.updateDiary(diaryId, diaryData);
    console.log("updatedDiary", updatedDiary);

    if (updatedDiary === undefined) {
      res.status(404).json("invalid diary id");
      return;
    }

    res.status(200).json("Modify success");
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};
