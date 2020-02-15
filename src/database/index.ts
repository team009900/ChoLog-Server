import { createConnection } from "typeorm";
import * as request from "request";
import { parseString } from "xml2js";
import "dotenv/config";
import API from "../entity/API";
import { plantsDatabaseType, apiType } from "../@types/entity";
import PlantsDatabase from "../entity/PlantsDatabase";
import PlantDataImg from "../entity/PlantDataImg";

const makeXmlToStr = (body: string): Promise<any> => {
  const strPromise: Promise<any> = new Promise((resolve, reject) => {
    parseString(body, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  return strPromise;
};

const requestGetBody = (url: string, key: string): Promise<any> => {
  const requestAns: Promise<any> = new Promise((resolve, reject) => {
    request(url, async (error: any, response: request.Response, body: any) => {
      console.log(`--- url: ${url.split(key).join("***")}`);
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      if (error) {
        reject(error);
      }
      // XML을 배열로 바꿈
      const xmlToStr = await makeXmlToStr(body);
      resolve(xmlToStr);
    });
  });
  return requestAns;
};

const settingPlantData = async (api: apiType): Promise<true | false> => {
  const { provider } = api;
  let { url } = api;
  const oneOfApi: API | undefined = await API.findByProvider(provider);
  if (oneOfApi === undefined) {
    return false;
  }

  if (provider === "garden" || provider === "dryGarden") {
    const nongsaroKey: string = process.env.NONGSARO_KEY ? process.env.NONGSARO_KEY : ""; // 농사로API 사용
    url = `${url}/${provider}List?apiKey=${nongsaroKey}`;

    //! 요청을 한번에 받아오기 위해 목록의 갯수를 받아옴
    let responseOfUrl = await requestGetBody(`${url}&numOfRows=0`, nongsaroKey);
    const totalCount = responseOfUrl.response.body[0].items[0].totalCount[0];
    // console.log({ totalCount });

    //! garden와 dryGarden의 응답변수가 다르기 때문에 필요한 응답변수를 parameter에 저장함
    const parameter = {
      distributionName: "cntntsSj",
      contentsNo: "cntntsNo",
      image: "string",
      imgUrl: "http://www.nongsaro.go.kr/cms_contents",
    };

    if (provider === "garden") {
      parameter.image = "rtnStreFileNm"; // 여러 image가 |를 기준으로 들어옴
      parameter.imgUrl += "/301/";
    } else if (provider === "dryGarden") {
      parameter.image = "imgUrl"; // imgUrl1과 imgUrl2가 있음
      parameter.imgUrl = ""; // image url이 필요없음
    }

    //! 유통명과 contents number를 한번에 받아오기 위한 API요청
    responseOfUrl = await requestGetBody(`${url}&numOfRows=${totalCount}`, nongsaroKey);

    //* list 받아오기
    const apiItemList = responseOfUrl.response.body[0].items[0].item;
    const getList: plantsDatabaseType[] = apiItemList.map(
      (item: any): plantsDatabaseType => {
        const distributionName: string = item[parameter.distributionName][0];
        const contentsNo: number = Number(item[parameter.contentsNo][0]);
        let tmpImages: string[] = [];
        if (provider === "garden") {
          tmpImages = item[parameter.image][0]
            .split("|")
            .map((img: string): string => parameter.imgUrl + img);
        } else if (provider === "dryGarden") {
          tmpImages.push(item[`${parameter.image}1`][0]);
          if (item[`${parameter.image}2`][0].length) {
            tmpImages.push(item[`${parameter.image}2`][0]);
          }
        }

        return { distributionName, tmpImages, contentsNo };
      },
    );

    // console.log("=====getList\n", getList);

    //! getList로 받아온 식물리스트들을 토대로 PlantsDatabase, PlantDataImg, PlantDetail엔티티 추가
    /*
    const plantsDBPromises: Promise<any>[] = getList.map(async (plantData: plantsDatabaseType) => {
      let plantImgs: (PlantDataImg | undefined)[];
      if (plantData.tmpImages !== undefined) {
        plantImgs = await Promise.all(
          plantData.tmpImages.map((img: string) => PlantDataImg.insertPlantImg(img)),
        );

        // for (let i = 0; i < plantData.tmpImages.length; i++) {
        //   const img: string = plantData.tmpImages[i];
        //   const plantImg = await PlantDataImg.insertPlantImg(img);
        //   plantImgs.push(plantImg);
        // }
      }
    });

    const plantsDatabases: PlantsDatabase[] = await Promise.all(plantsDBPromises);
    */
  }

  return true;
};

createConnection().then(async () => {
  console.log("typeorm connection completed in database/index.ts");
  const apis: apiType[] = [
    {
      provider: "garden",
      url: "http://api.nongsaro.go.kr/service/garden",
    },
    {
      provider: "dryGarden",
      url: "http://api.nongsaro.go.kr/service/dryGarden",
    },
  ];

  await Promise.all(apis.map((val: apiType): Promise<any> => API.insertAPI(val.provider, val.url)));

  await settingPlantData(apis[0]);
});
