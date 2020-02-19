import { Router } from "express";
import { diaryController } from "../controller";
import { uploadImg } from "../middlewares";

const router = Router();

//* POST /diary/:plantId
router.post("/:plantId", uploadImg.single("image"), diaryController.post);

//* GET  /diary/:diaryId
router.get("/:diaryId", diaryController.get);

//* PATCH /diary/:diaryId
router.patch("/:diaryId", diaryController.patch);

//* DELETE /diary/:diaryId
router.delete("/:diaryId", diaryController.delete);

export default router;
