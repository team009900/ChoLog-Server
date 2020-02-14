import { createConnection } from "typeorm";
import * as request from "request";
import { parseString } from "xml2js";
import "dotenv/config";

createConnection().then(() => {
  console.log("typeorm connection completed in database/index.ts");
  const nongsaroUrl = "http://api.nongsaro.go.kr/service/";
  const nongsaroKey = process.env.NONGSARO_KEY;

  request(
    `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=${nongsaroKey}&numOfRows=1`,
    (error: any, response: request.Response, body: any) => {
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      parseString(body, (err, result) => {
        console.log(
          result.response.body[0].items[0].item[0].rtnStreFileNm[0].split("|"),
        );
      });
    },
  );
});
