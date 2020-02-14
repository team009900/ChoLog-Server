import { createConnection } from "typeorm";
import * as request from "request";
import { parseString } from "xml2js";
import "dotenv/config";
import API from "../entity/API";
import { plantsDatabaseType, apiType } from "../@types/entity";

const settingPlantData = async (api: apiType): Promise<true | false> => {
  const { provider } = api;
  let { url } = api;
  const oneOfApi: API | undefined = await API.findByProvider(provider);
  if (oneOfApi === undefined) {
    return false;
  }

  if (provider === "garden" || provider === "dryGarden") {
    const nongsaroKey = process.env.NONGSARO_KEY; // 농사로API 사용
    url = `${url}/${provider}List?apiKey=${nongsaroKey}`;

    //! 요청을 한번에 받아오기 위해 목록의 갯수를 받아옴
    const totalCount = await new Promise(
      (resolve: (resolve: any) => any, reject: (reject: any) => any): void => {
        // 외부 API에 요청을 보냄
        request(
          `${url}&numOfRows=0`,
          (error: any, response: request.Response, body: any) => {
            console.log("error:", error);
            console.log("statusCode:", response && response.statusCode);
            if (error) {
              reject(error);
            }
            // XML을 배열로 바꿈
            parseString(body, (err, result) => {
              // console.log(result.response);
              resolve(result.response.body[0].items[0].totalCount[0]);
            });
          },
        );
      },
    );
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
    const getList = await new Promise(
      (resolve: (resolve: any) => any, reject: (reject: any) => any): void => {
        // console.log("------parameter:\n", parameter);

        // 외부 API에 요청을 보냄
        request(
          `${url}&numOfRows=${totalCount}`,
          (error: any, response: request.Response, body: any): void => {
            console.log("error:", error);
            console.log("statusCode:", response && response.statusCode);
            if (error) {
              reject(error);
            }
            // XML을 배열로 바꿈
            parseString(body, (err, result) => {
              if (err) {
                reject(err);
              }

              //* list 받아오기
              const apiItemList = result.response.body[0].items[0].item;
              const itemList: plantsDatabaseType[] = apiItemList.map(
                (item: any): plantsDatabaseType => {
                  const distributionName: string =
                    item[parameter.distributionName][0];
                  const contentsNo: number = Number(
                    item[parameter.contentsNo][0],
                  );
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
              resolve(itemList);
            });
          },
        );
      },
    );
    // console.log("------getList\n", getList);
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

  const tmp = await Promise.all(
    apis.map(
      (val: apiType): Promise<any> => API.insertAPI(val.provider, val.url),
    ),
  );
  console.log(
    "generatedMaps:",
    tmp[0].generatedMaps,
    "\nidentifiers:",
    tmp[0].identifiers,
    "\nraw:",
    tmp[0].raw,
  );

  await settingPlantData(apis[0]);
});
