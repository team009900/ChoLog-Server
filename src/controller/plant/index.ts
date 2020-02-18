import { Request, Response, NextFunction } from "express";
import Plant from "../../entity/Plant";
import { plantUpdateType } from "../../@types/entity";
import Family from "../../entity/Family";
import User from "../../entity/User";

// * 새 식물 생성 /plant
const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      res.status(400).json("존재하지 않는 유저입니다.");
      return;
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
      res.status(404).end();
      return;
    }

    newPlant.user = user;

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
const patch = async (req: Request, res: Response, next: NextFunction): Promise<Plant | void> => {
  const { plantId } = req.params;

  if (!Number(plantId)) {
    res.status(400).json("You send us bad request");
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
    familyName,
  } = req.body;

  try {
    let family; // familyName이 없을 수도 있기 때문에 밖에서 선언
    if (familyName) {
      // familyName이 있으면 찾고, 찾아도 없으면 생성해준다.
      family = await Family.findOrCreateFamily(familyName);
    }

    const plantData: plantUpdateType = {};

    if (image) {
      plantData.image = image;
    }
    if (nickname) {
      plantData.nickname = nickname;
    }
    if (plantName) {
      plantData.plantName = plantName;
    }
    if (scientificName) {
      plantData.scientificName = scientificName;
    }
    if (adoptionDate) {
      plantData.adoptionDate = adoptionDate;
    }
    if (deathDate) {
      plantData.deathDate = deathDate;
    }
    if (memo) {
      plantData.memo = memo;
    }
    if (advice) {
      plantData.advice = advice;
    }
    if (openAllow) {
      plantData.openAllow = openAllow;
    }

    const updatePlant = await Plant.updatePlant(Number(plantId), plantData);

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
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error: ${error}`);
  }
};

// * 식물 삭제 /plant/:plantId
const remove = (req: Request, res: Response, next: NextFunction): void => {
  const { plantId } = req.params;
  res.json(`plant delete. plantId: ${plantId}`);
};

// * 그 달의 식물 다이어리 가져오기 /plant/diaries?id=plantId&month=month
const diaryGet = (req: Request, res: Response, next: NextFunction): void => {
  const { month } = req.params;
  res.json(`Diary get. This month is ${month}`);
};

export { post, get, diaryGet, patch, remove as delete };
