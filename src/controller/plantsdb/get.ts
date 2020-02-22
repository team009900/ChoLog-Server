import { Request, Response, NextFunction } from "express";
import { PlantsDatabase } from "../../entity";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const plantsDBId: number = Number(req.params.plantsDBId);
    if (!plantsDBId) {
      res.status(400).json("invalid plants db id");
      return;
    }

    const findPlantData = await PlantsDatabase.findOne(
      { id: plantsDBId },
      { relations: ["images", "detail", "api"] },
    );
    if (findPlantData === undefined) {
      res.status(404).json(`not found plant data id: ${plantsDBId}`);
      return;
    }
    // console.log(findPlantData);

    const detail: any = JSON.parse(findPlantData.detail.contents);
    console.log(`+++++ ${plantsDBId}:\n${findPlantData.distributionName}`, detail);

    const { provider } = findPlantData.api;
    let advice: string = "";
    if (provider === "garden") {
      //! garden
      (<any>findPlantData).familyName = detail.fmlCodeNm; //* 과명 입력

      advice = provider;
    } else if (provider === "dryGarden") {
      //! dryGarden
      //* 과명 입력
      const familyName: string = detail.clNm;
      const indexStart = familyName.lastIndexOf("(");
      (<any>findPlantData).familyName = familyName.substring(indexStart + 1, familyName.length - 1);

      const useInfos: { key: string; value: string }[] = [
        { key: "waterCycleInfo", value: "물주기는 " },
        { key: "lighttInfo", value: "빛은 " },
        { key: "frtlzrInfo", value: "비료는 " },
        { key: "dlthtsInfo", value: "병충해는 " },
        { key: "flwrInfo", value: "꽃은 " },
        { key: "grwhTpInfo", value: "생육온도는 " },
        { key: "pswntrTpInfo", value: "월동온도는 " },
        { key: "chartrInfo", value: "" },
      ];

      for (let i = 0; i < useInfos.length; i += 1) {
        const useInfo = useInfos[i];
        if (detail[useInfo.key]) {
          advice += `${useInfo.value}${detail[useInfo.key].split("<br />").join(" ")}.\n`;
        }
      }
    }

    (<any>findPlantData).advice = advice.substring(0, advice.length - 1);
    findPlantData.detail = detail;

    delete findPlantData.detail;
    delete findPlantData.api;
    res.json(findPlantData);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json(`Error name: ${err.name}`);
  }
};
