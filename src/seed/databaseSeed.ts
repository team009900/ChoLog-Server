import { API, PlantsDatabase, PlantDataImg } from "../entity";
import { plantsDatabaseType, apiType } from "../@types/entity";
import { requestGetBody, setMyTimer } from "../services";
import "dotenv/config";

const setDatabaseSeed = async (api: API): Promise<true | false> => {
  try {
    const { provider } = api;
    let { url } = api;

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

      //! 1초 후 요청보내기
      await setMyTimer(1000);

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

      //! getList로 받아온 식물리스트들을 토대로 PlantsDatabase, PlantDataImg 엔티티 추가
      const plantsDBPromises: Promise<any>[] = getList.map(
        async (plantData: plantsDatabaseType): Promise<PlantsDatabase | undefined> => {
          //* PlantDatabase 생성
          const newPlantDatabase: PlantsDatabase | undefined = await PlantsDatabase.insertPlantData(
            plantData,
          );
          if (newPlantDatabase === undefined) {
            // console.log(`newPlantDatabase: ${newPlantDatabase}`);
            return undefined;
          }
          newPlantDatabase.images = newPlantDatabase.images ? newPlantDatabase.images : [];

          let plantImgs: (PlantDataImg | undefined)[] = [];
          if (plantData.tmpImages !== undefined) {
            //* PlantDataImg에 이미지 추가 후 생성 된 PlantDataImg들 받아옴
            plantImgs = await Promise.all(
              plantData.tmpImages.map((img: string) => PlantDataImg.insertPlantImg(img)),
            );
          }

          //* 생성된 PlantDatabase의 images에 PlantDataImg 추가
          plantImgs.forEach((value: PlantDataImg | undefined): void => {
            if (value === undefined) return;
            newPlantDatabase.images.push(value);
          });

          //* 생성된 PlantDatabase에 api추가
          // newPlantDatabase.api = oneOfApi;

          await newPlantDatabase.save();
          // console.log(newPlantDatabase);
          return newPlantDatabase;
        },
      );
      await Promise.all(plantsDBPromises);
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const runDatabaseSeed = async () => {
  const apiData: apiType[] = [
    {
      provider: "garden",
      url: "http://api.nongsaro.go.kr/service/garden",
    },
    {
      provider: "dryGarden",
      url: "http://api.nongsaro.go.kr/service/dryGarden",
    },
  ];

  const apis = await Promise.all(
    apiData.map((val: apiType): Promise<any> => API.findOrCreate(val.provider, val.url)),
  );

  const result: boolean[] = [];
  result.push(await setDatabaseSeed(apis[0]));
  if (!result[0]) {
    console.log("result of setting basic plant data: false");
    return;
  }

  //! 1초 후 요청보내기
  await setMyTimer(1000);

  result.push(await setDatabaseSeed(apis[1]));
  if (!result[1]) {
    console.log("result of setting basic plant data: false");
    return;
  }

  console.log("result of setting basic plant data: ", result);
};

export default runDatabaseSeed;
