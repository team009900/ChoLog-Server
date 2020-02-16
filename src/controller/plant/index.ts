import { Request, Response, NextFunction } from "express";
import Plant from "../../entity/Plant";
import Family from "../../entity/Family";
import User from "../../entity/User";

// * 새 식물 생성 /plant
const post = async (req: Request, res: Response, next: NextFunction) => {
  console.log("식물생서어엉~");
  const {
    id,
    email,
    mainImage,
    nickname,
    plantName,
    scientificName,
    adoptionDate,
    deathDate,
    memo,
    advice,
    openAllow,
  } = req.body;

  const user = await User.findByEmail(email);

  if (!user) {
    return res.status(400).json("존재하지 않는 유저입니다.");
  }
  await User.save(user);
  // const familyName = Family.find({ select: ["familyName"] });

  const newPlant = new Plant();
  newPlant.id = id;
  newPlant.mainImage = mainImage;
  newPlant.nickname = nickname;
  newPlant.plantName = plantName;
  newPlant.scientificName = scientificName;
  newPlant.adoptionDate = adoptionDate;
  newPlant.deathDate = deathDate;
  newPlant.memo = memo;
  newPlant.advice = advice;
  newPlant.openAllow = openAllow;
  newPlant.user = user;
  await Plant.save(newPlant);

  return res.status(201).json({
    newPlant: {
      id,
      mainImage,
      nickname,
      plantName,
      scientificName,
      adoptionDate,
      deathDate,
      memo,
      advice,
      openAllow,
    },
    user: {
      id: user.id,
      username: user.username,
    },
    // familyName,
  });

  // .catch((err) => res.status(400).send(err));
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

// * 그 달의 식물 다이어리 가져오기
const diaryGet = (req: Request, res: Response, next: NextFunction): void => {
  const { month } = req.params;
  res.json(`Diary get. This month is ${month}`);
};

export { post, get, diaryGet, patch, remove as delete };
