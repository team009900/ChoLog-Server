import * as request from "request";
import makeXmlToStr from "./makeXmlToStr";

export default (url: string, key: string, log: boolean = true): Promise<any> => {
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
        console.log(body);
        reject(new Error(`statusCode: ${statusCode}`));
      }
      // XML을 배열로 바꿈
      const xmlToStr = await makeXmlToStr(body);
      resolve(xmlToStr);
    });
  });
  return requestAns;
};
