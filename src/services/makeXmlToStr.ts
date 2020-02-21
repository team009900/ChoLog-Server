import { parseString } from "xml2js";

export default (body: string): Promise<any> => {
  const strPromise: Promise<any> = new Promise((resolve, reject) => {
    parseString(body, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  return strPromise;
};
