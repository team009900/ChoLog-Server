import { Router } from "express";
import { plantController } from "../controller";
import { uploadImg, deleteImg } from "../middlewares";

const router = Router();

//* POST /plant
router.post("/", uploadImg.single("image"), plantController.post, deleteImg);

//* GET /plant/:plantId
router.get("/:plantId", plantController.get);

//* PATCH /plant/:plantId
router.patch("/:plantId", uploadImg.single("image"), plantController.patch, deleteImg);

//* DELETE /plant/:plantId
router.delete("/:plantId", plantController.delete);

//* getDiary /plant/diaries?id=plantId&month=month
router.get("/diaries", plantController.diaryGet);

export default router;
