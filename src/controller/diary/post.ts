import { Request, Response, NextFunction } from "express";
import { diaryType, stateType } from "../../@types/entity";
import { Plant, Diary, State, Parameter, Weather } from "../../entity";
import { diaryFormatting } from "../../services";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { plantId } = req.params;
    const { createdAt, note, weatherId, humidity, finedust, temperature } = req.body;
    let { states: baseStates } = req.body;
    if (baseStates) {
      baseStates = JSON.parse(baseStates);
    }

    const multerS3: any = req.file;
    let image: string | undefined;
    if (multerS3) {
      image = multerS3.location;
    }

    const diaryData: diaryType = {
      createdAt,
      note,
      humidity,
      finedust,
      image,
      temperature,
    };

    //! body로 입력되지 않은 데이터의 key value쌍 삭제
    let diaryDataKeys: string[] = Object.keys(diaryData);
    diaryDataKeys.forEach((key: string) => {
      if (diaryData[key] === undefined) {
        delete diaryData[key];
      }
    });
    // console.log(diaryData);

    diaryDataKeys = Object.keys(diaryData);
    if (diaryDataKeys.length === 0 || (diaryDataKeys.length === 1 && diaryData.createdAt)) {
      res.status(400).json("Send at least one date");
      return;
    }

    let states: State[] = [];
    if (baseStates?.length) {
      // console.log(state);
      states = await Promise.all(
        baseStates.map(async (oneState: stateType) => {
          const findParam = await Parameter.findOne({ id: oneState.id });
          if (findParam === undefined) {
            return undefined;
          }

          return State.insertState(findParam, oneState.level);
        }),
      );
    }
    diaryData.states = states;

    // console.log(diaryData);
    const newDiary = await Diary.insertDiary(diaryData);
    if (newDiary === undefined) {
      res.status(400).json("Fail to insert diary");
      return;
    }

    if (weatherId) {
      const findWeather = await Weather.findOne({ id: weatherId });
      if (findWeather === undefined) {
        res.status(400).json("Fail to find weather");
        return;
      }

      newDiary.weather = findWeather;
    }

    const findPlant: Plant | undefined = await Plant.findOne({ id: Number(plantId) });
    if (findPlant === undefined) {
      res.status(400).json("You send bad request");
      return;
    }
    newDiary.plant = findPlant;
    // console.log(newDiary);

    await newDiary.save();
    res.json(diaryFormatting(newDiary));
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json(`Error name: ${err.name}`);
  }
};
