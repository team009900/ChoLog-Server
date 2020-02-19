import { Request, Response, NextFunction } from "express";
import * as AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

export default (req: Request, res: Response, next: NextFunction) => {
  let { image } = <any>req;
  image = image.split(process.env.S3_ADDRESS).join("");

  // console.log({ image });

  const s3 = new AWS.S3();
  s3.deleteObject(
    {
      Bucket: "cholog",
      Key: image,
    },
    (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log("image deleted");
    },
  );
};
