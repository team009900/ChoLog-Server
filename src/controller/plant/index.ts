import { Request, Response, NextFunction } from "express";
import Plant from "../../entity/Plant";
import Family from "../../entity/Family";
import User from "../../entity/User";
import { plant } from "../parameters";

// * 새 식물 생성 /plant
const post = async (req: Request, res: Response, next: NextFunction) => {
  console.log("식물생서어엉~");
  const {
    email,
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

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json("존재하지 않는 유저입니다.");
    }

    let family; // familyName이 없을 수도 있기 때문에 밖에서 선언
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
      return res.status(404).end();
    }

    newPlant.user = user;

    if (family) {
      newPlant.family = family;
    }

    await Plant.save(newPlant);
    // console.log(newPlant);

    const body = {
      id: newPlant.id,
      mainImage: newPlant.image,
      nickname: newPlant.nickname,
      plantName: newPlant.plantName,
      scientificName: newPlant.scientificName,
      adoptionDate: newPlant.adoptionDate,
      deathDate: newPlant.deathDate,
      memo: newPlant.memo,
      advice: newPlant.advice,
      openAllow: newPlant.openAllow,
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
    return res.status(201).json(body);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// * 식물 정보 갖고오기 /plant/:plantId
const get = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant get. plantId: ${plantId}`);
};

// * 식물 정보 수정 /plant/:plantId
const patch = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant patch. plantId: ${plantId}`);
};

// * 식물 삭제 /plant/:plantId
const remove = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant delete. plantId: ${plantId}`);
};

// * 그 달의 식물 다이어리 가져오기 /plant/diaries?id=diaryId&month=month
const diaryGet = (req: Request, res: Response, next: NextFunction): void => {
  const { month } = req.params;
  res.json(`Diary get. This month is ${month}`);
};

export { post, get, diaryGet, patch, remove as delete };
