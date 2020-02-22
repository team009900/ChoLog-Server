import { Request, Response, NextFunction } from "express";
import { userInfo } from "os";
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

    if (findPlantData.detail) {
      const detail: any = JSON.parse(findPlantData.detail.contents);
      console.log(`+++++ ${plantsDBId}: ${findPlantData.distributionName}\n`, detail);

      const { provider } = findPlantData.api;
      let useInfos: { key: string; value: string }[] = [];
      let advice: string = "";
      if (provider === "garden") {
        //! garden
        (<any>findPlantData).familyName = detail.fmlCodeNm; //* 과명 입력

        //* advice 입력
        useInfos = [
          // { key: "dlthtsCodeNm", value: "병충해: " },
          { key: "dlthtsManageInfo", value: "병충해 관리: " },
          { key: "ignSeasonCodeNm", value: "꽃 피는 계절: " },
          { key: "flclrCodeNm", value: "꽃 색: " },
          { key: "grwhTpCodeNm", value: "생육 온도: " },
          { key: "winterLwetTpCodeNm", value: "생육 최저 온도: " },
          { key: "hdCodeNm", value: "적정습도: " },
          { key: "watercycleSprngCodeNm", value: "물주기(봄): " },
          { key: "watercycleSummerCodeNm", value: "물주기(여름): " },
          { key: "watercycleAutumnCodeNm", value: "물주기(가을): " },
          { key: "watercycleWinterCodeNm", value: "물주기(겨울): " },
          // { key: "frtlzrInfo", value: "비료: " },
          { key: "lighttdemanddoCodeNm", value: "빛: " },
          // { key: "hdCodeNm", value: "적정습도: " },
          // { key: "hdCodeNm", value: "적정습도: " },
          { key: "fncltyInfo", value: "기타관리 정보:" },
          // { key: "postngplaceCodeNm", value: "배치장소: " },
          // { key: "adviseInfo", value: "기타 정보:" },
        ];
      } else if (provider === "dryGarden") {
        //! dryGarden
        //* 과명 입력
        const familyName: string = detail.clNm;
        const indexStart = familyName.lastIndexOf("(");
        (<any>findPlantData).familyName = familyName.substring(
          indexStart + 1,
          familyName.length - 1,
        );

        //* advice 입력
        useInfos = [
          { key: "waterCycleInfo", value: "물주기: " },
          { key: "lighttInfo", value: "빛: " },
          { key: "frtlzrInfo", value: "비료: " },
          { key: "dlthtsInfo", value: "병충해: " },
          { key: "flwrInfo", value: "꽃: " },
          { key: "grwhTpInfo", value: "생육온도: " },
          { key: "pswntrTpInfo", value: "월동온도: " },
          { key: "chartrInfo", value: "특징: " },
        ];
      }

      for (let i = 0; i < useInfos.length; i += 1) {
        const useInfo: { key: string; value: string } = useInfos[i];
        if (detail[useInfo.key]) {
          // if (useInfo.key === "adviseInfo") {
          //   if (advice.match("기타 정보") === undefined) {
          //     useInfo.value = "기타 정보: ";
          //   }
          // }
          advice += `${useInfo.value}${detail[useInfo.key].split("<br />").join(" ")}.\n`;
        }
      }

      (<any>findPlantData).advice = advice.substring(0, advice.length - 1);
      findPlantData.detail = detail;
    }

    delete findPlantData.detail;
    delete findPlantData.api;
    res.json(findPlantData);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json(`Error name: ${err.name}`);
  }
};
