import * as AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

export default (inputImg: string): Promise<any> => {
  const resultPromise = new Promise((resolve, reject) => {
    // console.log(typeof inputImg, { inputImg });
    if (typeof inputImg !== "string") {
      console.log("empty img");
      resolve(false);
      return;
    }
    try {
      const s3Address = process.env.S3_ADDRESS ? process.env.S3_ADDRESS : "";
      const image = inputImg.split(s3Address).join("");
      const s3 = new AWS.S3();
      s3.deleteObject(
        {
          Bucket: "cholog",
          Key: image,
        },
        (err, data) => {
          if (err) {
            reject(err);
          }
          console.log("image deleted");
          resolve(true);
        },
      );
    } catch (err) {
      reject(err);
    }
  });

  return resultPromise;
};
