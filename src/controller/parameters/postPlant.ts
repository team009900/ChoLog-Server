import { Request, Response, NextFunction } from "express";
import Plant from "../../entity/Plant";
import Parameter from "../../entity/Parameter";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { plantId } = req.params;
  if (!Number(plantId)) {
    res.status(400).json("You send us bad request");
  }

  const { parameters } = req.body; // "[1, 2, 3]"
  if (parameters.charAt(0) !== "[") {
    res.status(400).json("Array 형식으로 입력해 주세요.");
    return;
  }

  const parseParameters = JSON.parse(parameters); // [1, 2, 3]

  if (!Array.isArray(parseParameters)) {
    res.status(400).json("Array 형식으로 입력해 주세요.");
    return;
  }

  try {
    const findPlant = await Plant.findOne({
      where: { id: plantId, relations: ["parameters"] },
    });
    if (findPlant === undefined) {
      res.status(404).json(`Plant ${plantId} does not exist`);
      return;
    }

    const selectParameters = await Promise.all(
      parseParameters.map((id: number) => Parameter.findOne(id)),
    )
      .then((result: any) => result)
      .catch((err) => {
        console.error(err);
        res.status(400).json(`Error: ${err}`);
      });

    findPlant.parameters = selectParameters;
    await Plant.save(findPlant);

    res.status(201).json(selectParameters);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error: ${error}`);
  }
};
