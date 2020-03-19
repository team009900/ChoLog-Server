import { PlantsDatabase, PlantDetail } from "../entity";
import { requestGetBody } from ".";

const setDetailPlantData = async (value: PlantsDatabase): Promise<true | false> => {
  const nongsaroKey: string = process.env.NONGSARO_KEY ? process.env.NONGSARO_KEY : "";
  const plantData = value;
  const { api, contentsNo } = plantData;
  // console.log(plantData);

  if (plantData.detail) {
    // console.log("+ this plantData has detail value");
    return true;
  }

  if (contentsNo === undefined || api === undefined) {
    return false;
  }

  const url = `${api.url}/${api.provider}Dtl?apiKey=${nongsaroKey}&cntntsNo=${contentsNo}`;

  try {
    //! API요청 후 데이터 가공(사용하기 편하게)
    const detailData = (await requestGetBody(url, nongsaroKey)).response.body[0].item[0];
    const detailDataKeys = Object.keys(detailData);
    for (let i = 0; i < detailDataKeys.length; i += 1) {
      const key = detailDataKeys[i];
      const detailValue = detailData[key][0];
      detailData[key] = detailValue;
    }
    // console.log(detailData);

    //! detail data에서 유통명 추가
    const distributionName: string = detailData.distbNm;
    if (distributionName) {
      if (distributionName.match(plantData.distributionName)) {
        plantData.distributionName = distributionName;
      } else {
        plantData.distributionName += `, ${distributionName}`;
      }
    }

    if (api.provider === "garden") {
      plantData.scientificName = detailData.plntbneNm;
      plantData.englishName = detailData.plntzrNm;
    } else if (api.provider === "dryGarden") {
      plantData.englishName = detailData.plntzrNm;
    }

    const newPlantDetail = await PlantDetail.findOrCreate(JSON.stringify(detailData), "JSON");
    // const newPlantDetail = await PlantDetail.findOne({ where: { id: 1 } });
    // console.log(newPlantDetail);
    if (newPlantDetail === undefined) {
      return false;
    }
    plantData.detail = newPlantDetail;

    await plantData.save();
    // console.log(plantData);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default setDetailPlantData;
