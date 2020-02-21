import { Request, Response, NextFunction } from "express";
import { setImgDelQuery, removeNullKeys, deleteImg } from "../../services";
import { diaryUpdateType, stateType } from "../../@types/entity";
import { Diary, State } from "../../entity";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const diaryId: number = Number(req.params.diaryId);
    const { humidity, createdAt, note, weatherId, states: baseStates, temperature } = req.body;

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

    if (updatedDiary === undefined) {
      res.status(404).json("invalid diary id");
      return;
    }

    //! 상태변경
    if (baseStates) {
      let newStates: (State | undefined)[] = updatedDiary.states;
      // console.log(baseStates);

      //! 현재 state 받아와서 수정하고 없어진 state는 삭제
      newStates = await Promise.all(
        newStates.map(async (nState: State | undefined) => {
          if (nState === undefined) {
            return undefined;
          }
          const changeState = nState;
          const targetState = baseStates.find((bState, index) => {
            // console.log(bState, changeState);
            if (bState.id === changeState.parameter.id) {
              baseStates.splice(index, 1);
              return true;
            }
            return false;
          });
          if (targetState) {
            changeState.level = targetState.level;
            return changeState.save();
          }
          await changeState.remove();
          return undefined;
        }),
      );
      // console.log(baseStates);

      //! 새로 생긴 state 추가
      const tmpStates: (State | undefined)[] = await Promise.all(
        baseStates.map(
          async (bState: stateType): Promise<State | undefined> => {
            const result = await State.insertByParamId(bState.id, bState.level);
            return result;
          },
        ),
      );
      newStates.push(...tmpStates);
      // console.log(newStates);

      updatedDiary.states = [];
      newStates.forEach((nState) => {
        if (nState) {
          updatedDiary.states.push(nState);
        }
      });
      // console.log(updatedDiary.states);
    }

    await updatedDiary.save();
    // console.log("updatedDiary", updatedDiary);

    res.status(200).json("Modify success");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json(`Error name: ${err.name}`);
  }
};
