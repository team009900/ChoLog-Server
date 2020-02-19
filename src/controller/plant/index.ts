import { Request, Response, NextFunction } from "express";
import Plant from "../../entity/Plant";
import { plantUpdateType } from "../../@types/entity";
import Family from "../../entity/Family";
import User from "../../entity/User";
import { deleteImg } from "../../services";
import Diary from "../../entity/Diary";

// * 새 식물 생성 /plant
const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("식물생서어엉~");
  const {
    image,
    nickname,
    plantName,
    scientificName,
    adoptionDate,
    deathDate,
    memo,
    advice,
    openAllow,
    familyName,
  } = req.body;

  const { id } = (<any>req).decoded;

  try {
    const findUser = await User.findOne({ id });
    if (!findUser) {
      res.status(400).json("존재하지 않는 유저입니다.");
      return;
    }

    let family: any; // familyName이 없을 수도 있기 때문에 밖에서 선언
    if (familyName) {
      family = await Family.findOrCreateFamily(familyName); // familyName이 있으면 찾고, 찾아도 없으면 생성해준다.
    }

    const newPlant = await Plant.createPlant(
      image,
      nickname,
      plantName,
      scientificName,
      adoptionDate,
      deathDate,
      memo,
      advice,
      openAllow,
    );

    if (newPlant === undefined) {
      res.status(404).end();
      return;
    }

    newPlant.user = findUser;

    const multerS3: any = req.file;
    if (multerS3) {
      newPlant.image = multerS3.location;
    }

    if (family) {
      newPlant.family = family;
    }

    await Plant.save(newPlant);
    // console.log(newPlant);

    const body = {
      id: newPlant.id,
      image: newPlant.image,
      nickname: newPlant.nickname,
      plantName: newPlant.plantName,
      scientificName: newPlant.scientificName,
      adoptionDate: newPlant.adoptionDate,
      deathDate: newPlant.deathDate,
      memo: newPlant.memo,
      advice: newPlant.advice,
      openAllow: newPlant.openAllow,
      user: {
        id: findUser.id,
        username: findUser.username,
      },
      family: {},
    };

    if (family) {
      body.family = {
        id: family.id,
        familyName: family.familyName,
      };
    }
    res.status(201).json(body);
  } catch (error) {
    res.status(400).json(error);
  }
};

// * 식물 정보 갖고오기 /plant/:plantId
const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { plantId } = req.params;
  if (!Number(plantId)) {
    res.status(400).json("You send us bad request");
    return;
  }

  try {
    const findPlant = await Plant.findOne({
      where: { id: plantId },
      relations: ["user", "family"],
    });

    if (findPlant === undefined) {
      res.status(404).json(`Plant ${plantId} does not exist`);
      return;
    }

    const {
      id,
      image,
      nickname,
      plantName,
      scientificName,
      adoptionDate,
      deathDate,
      memo,
      advice,
      openAllow,
      user,
      family,
    } = findPlant;

    const body = {
      id,
      image,
      nickname,
      plantName,
      scientificName,
      adoptionDate,
      deathDate,
      memo,
      advice,
      openAllow,
      user: {
        id: user.id,
        username: user.username,
      },
      family: {},
    };

    if (family) {
      body.family = {
        id: family.id,
        familyName: family.familyName,
      };
    }

    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error: ${error}`);
  }
};

// * 식물 정보 수정 /plant/:plantId
const patch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { plantId } = req.params;

  if (!Number(plantId)) {
    res.status(400).json("You send us bad request");
    return;
  }

  const {
    nickname,
    plantName,
    scientificName,
    adoptionDate,
    deathDate,
    memo,
    advice,
    openAllow,
    familyName,
  } = req.body;

  try {
    // id로 plant 찾기
    const findPlant = await Plant.findOne({ where: { id: plantId } });
    if (findPlant === undefined) {
      res.status(404).json(`Plant ${plantId} does not exist`);
      return;
    }

    const deleteImgQuery = req.query["img-del"];
    if (deleteImgQuery !== "true" && deleteImgQuery !== "false" && deleteImgQuery !== undefined) {
      res.status(400).json("You send us invalid request");
      return;
    }
    const isDeleteImg: boolean = deleteImgQuery === "true";

    const multerS3: any = req.file;
    let image: string | undefined;
    if (multerS3) {
      image = multerS3.location;
    }

    let family: any; // familyName이 없을 수도 있기 때문에 밖에서 선언
    if (familyName) {
      // familyName이 있으면 찾고, 찾아도 없으면 생성해준다.
      family = await Family.findOrCreateFamily(familyName);
    }

    const plantData: plantUpdateType = {
      image,
      nickname,
      plantName,
      scientificName,
      adoptionDate,
      deathDate,
      memo,
      advice,
      openAllow,
    };

    // body로 입력되지 않은 데이터는 지워주지 않으면 자동으로 null로 들어가서 정보가 수정되기 때문에 그 값을 지워줌
    const plantDataKeys: string[] = Object.keys(plantData);
    plantDataKeys.forEach((key: string) => {
      if (plantData[key] === undefined) {
        delete plantData[key];
      }
    });

    if (isDeleteImg) {
      await deleteImg(findPlant.image);
      plantData.image = undefined;
    }

    const updatePlant = await Plant.updatePlant(findPlant.id, plantData);

    if (updatePlant === undefined) {
      res.status(404).end();
      return;
    }

    if (family) {
      updatePlant.family = family;
    }
    await Plant.save(updatePlant);

    const body = {
      id: updatePlant.id,
      image: updatePlant.image,
      nickname: updatePlant.nickname,
      plantName: updatePlant.plantName,
      scientificName: updatePlant.scientificName,
      adoptionDate: updatePlant.adoptionDate,
      deathDate: updatePlant.deathDate,
      memo: updatePlant.memo,
      advice: updatePlant.advice,
      openAllow: updatePlant.openAllow,
      family: {},
    };

    if (family) {
      body.family = {
        id: family.id,
        familyName: family.familyName,
      };
    }

    res.status(200).json(body);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error: ${error}`);
  }
};

// * 식물 삭제 /plant/:plantId
const remove = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { plantId } = req.params;
  if (!Number(plantId)) {
    return res.status(400).json("You send us bad request");
  }

  try {
    const findPlant = await Plant.findOne({
      where: { id: plantId },
    });

    if (findPlant === undefined) {
      return res.status(404).json(`Plant ${plantId} does not exist`);
    }

    await Plant.remove(findPlant);

    return res.status(200).json(`id: ${plantId} is deleted successfully`);
  } catch (error) {
    console.error(error);
    return res.status(400).json(`Error: ${error}`);
  }
};

// * 그 달의 식물 다이어리 가져오기 /plant/diaries?id=plantId&month=month
const diaryGet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const plantId = req.query.id;
  const diaryYear = req.query.year;
  const diaryMonth = req.query.month;

  if (diaryYear === undefined || diaryMonth === undefined) {
    res.status(400).json("날짜를 입력해주세요.");
    return;
  }

  if (diaryMonth.toString().length !== 2 || diaryYear.toString().length !== 4) {
    res.status(400).json("YYYY-MM 형식으로 입력해 주세요.");
    return;
  }
  if (diaryMonth < 1 || diaryMonth > 12) {
    res.status(400).json("This is a invalid month.");
    return;
  }

  const diaryFullDate = `${diaryYear}-${diaryMonth}`; // "YYYY-MM"

  try {
    const findPlantDiary = await Plant.findDiariesById(plantId);
    if (findPlantDiary === undefined) {
      res.status(404).json(`Plant ${plantId} does not exist`);
      return;
    }

    const plantsDiary: Diary[] = [];
    findPlantDiary.forEach((diary: Diary) => {
      const tmpDiary: Diary = diary;
      const dateFormat = tmpDiary.createdAt.toISOString().slice(0, 10);

      const year = dateFormat.slice(0, 4); // "YYYY"
      const month = dateFormat.slice(5, 7); // "MM"
      const fullDate = `${year}-${month}`; // "YYYY-MM"

      if (diaryFullDate === fullDate) {
        plantsDiary.push(tmpDiary);
      }
    });

    res.status(200).json(plantsDiary);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error name: ${error.name}`);
  }
};

export { post, get, diaryGet, patch, remove as delete };
