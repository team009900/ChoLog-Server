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

const requestGetBody = (url: string, key: string, log: boolean = true): Promise<any> => {
  const requestAns: Promise<any> = new Promise((resolve, reject) => {
    request(url, async (error: any, response: request.Response, body: any) => {
      const statusCode: number = response && response.statusCode;
      if (log) {
        console.log(`--- url: ${url.split(key).join("***")}`);
        console.log("error:", error);
        console.log("statusCode:", response && response.statusCode);
      }
      if (error) {
        reject(error);
      }
      if (statusCode.toString()[0] !== "2") {
        reject(new Error(`statusCode: ${statusCode}`));
      }
      // XML을 배열로 바꿈
      const xmlToStr = await makeXmlToStr(body);
      resolve(xmlToStr);
    });
  });
  return requestAns;
};

const settingBasicPlantData = async (api: apiType): Promise<true | false> => {
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
      image: "",
      imgUrl: "http://www.nongsaro.go.kr/cms_contents",
      scientificName: "",
    };

    if (provider === "garden") {
      parameter.image = "rtnStreFileNm"; // 여러 image가 |를 기준으로 들어옴
      parameter.imgUrl += "/301/";
    } else if (provider === "dryGarden") {
      parameter.image = "imgUrl"; // imgUrl1과 imgUrl2가 있음
      parameter.imgUrl = ""; // image url이 필요없음
      parameter.scientificName = "scnm";
    }

    //! 유통명과 contents number를 한번에 받아오기 위한 API요청
    responseOfUrl = await requestGetBody(`${url}&numOfRows=${totalCount}`, nongsaroKey);

    //* list 받아오기
    const apiItemList = responseOfUrl.response.body[0].items[0].item;
    const getList: plantsDatabaseType[] = apiItemList.map(
      (item: any): plantsDatabaseType => {
        //* 유통명 저장
        const distributionName: string = item[parameter.distributionName][0];

        //* 컨텐츠 번호 저장
        const contentsNo: number = Number(item[parameter.contentsNo][0]);

        let tmpImages: string[] = [];
        //! provider가 garden인 경우
        if (provider === "garden") {
          //* 이미지 저장
          tmpImages = item[parameter.image][0]
            .split("|")
            .map((img: string): string => parameter.imgUrl + img);

          return { distributionName, tmpImages, contentsNo };
        }

        //! provider가 dryGarden인 경우
        //* 이미지 저장
        tmpImages.push(item[`${parameter.image}1`][0]);
        if (item[`${parameter.image}2`][0].length) {
          tmpImages.push(item[`${parameter.image}2`][0]);
        }

        //* 학명 저장
        const scientificName: string = item[parameter.scientificName][0]
          .split("<i>")
          .join("")
          .split("</i>")
          .join("");
        return { distributionName, scientificName, tmpImages, contentsNo };
      },
    );
    // console.log("=====getList\n", getList);

    //! getList로 받아온 식물리스트들을 토대로 PlantsDatabase, PlantDataImg 엔티티 추가
    const plantsDBPromises: Promise<any>[] = getList.map(
      async (plantData: plantsDatabaseType): Promise<PlantsDatabase | undefined> => {
        //* PlantDatabase 생성
        const newPlantDatabase: PlantsDatabase | undefined = await PlantsDatabase.insertPlantData(
          plantData,
        );
        if (newPlantDatabase === undefined) {
          console.log(`newPlantDatabase: ${newPlantDatabase}`);
          return undefined;
        }
        newPlantDatabase.images = newPlantDatabase.images ? newPlantDatabase.images : [];

        let plantImgs: (PlantDataImg | undefined)[] = [];
        if (plantData.tmpImages !== undefined) {
          //* PlantDataImg에 이미지 추가 후 생성 된 PlantDataImg들 받아옴
          plantImgs = await Promise.all(
            plantData.tmpImages.map((img: string) => PlantDataImg.insertPlantImg(img)),
          );
          // console.log(plantImgs);
        }

        //* 생성된 PlantDatabase의 images에 PlantDataImg 추가
        plantImgs.forEach((value: PlantDataImg | undefined): void => {
          if (value === undefined) return;
          newPlantDatabase.images.push(value);
        });

        //* 생성된 PlantDatabase에 api추가
        newPlantDatabase.api = oneOfApi;

        await newPlantDatabase.save();
        // console.log(newPlantDatabase);
        return newPlantDatabase;
      },
    );
    await Promise.all(plantsDBPromises);
  }

  console.log("++++++++ settingBasicPlantData complete ++++++++");
  return true;
};

const settingDetailPlantData = async (): Promise<true | false> => {
  const nongsaroKey: string = process.env.NONGSARO_KEY ? process.env.NONGSARO_KEY : "";
  const getAll: PlantsDatabase[] = await PlantsDatabase.find({
    where: { detail: null },
    relations: ["api"],
  });
  console.log(`** getAll.length: ${getAll.length}`);

  const getAllPromise = await Promise.all(
    getAll.map(async (value: PlantsDatabase, index: number) => {
      const plantData = value;
      // console.log(plantData);
      const { api, contentsNo } = plantData;

      const url = `${api.url}/${api.provider}Dtl?apiKey=${nongsaroKey}&cntntsNo=${contentsNo}`;

      //! 농사로에 API요청 후 데이터 가공(사용하기 편하게)
      const detailData = (await requestGetBody(url, nongsaroKey)).response.body[0].item[0];
      const detailDataKeys = Object.keys(detailData);
      for (let i = 0; i < detailDataKeys.length; i += 1) {
        const key = detailDataKeys[i];
        const detailValue = detailData[key][0];
        detailData[key] = detailValue;
      }
      // console.log(detailData);

      if (api.provider === "garden") {
        plantData.scientificName = detailData.plntbneNm;
        plantData.englishName = detailData.plntzrNm;
      } else if (api.provider === "dryGarden") {
        plantData.englishName = detailData.plntzrNm;
      }

      await plantData.save();

      if (index % 50 === 0) {
        await setTimeout(() => console.log("=====", index), 1000);
      }
    }),
  );

  // await Promise.all(getAllPromise);

  console.log("++++++++ settingDetailPlantData complete ++++++++");
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

  let result: any = [];
  // result.push(await settingBasicPlantData(apis[0]));
  // result.push(await settingBasicPlantData(apis[1]));
  console.log("result of setting basic plant data: ", result);

  result = await settingDetailPlantData();
  console.log("result of setting detail plant data: ", result);
});
