import { Express } from "express";
import * as multer from "multer";
import * as fs from "fs";
import * as path from "path";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";
import "dotenv/config";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "cholog",
    key(req: Express.Request, file: Express.Multer.File, callback) {
      callback(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
