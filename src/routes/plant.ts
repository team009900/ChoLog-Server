import { Router } from "express";
import { plantController } from "../controller";
import { uploadImg } from "../middlewares";

const router = Router();

//* POST /plant
router.post("/", uploadImg.single("image"), plantController.post);

//* getDiary /plant/diaries?id=plantId&year=year&month=month
router.get("/diaries", plantController.diaryGet);

//* GET /plant/:plantId
router.get("/:plantId", plantController.get);

//* PATCH /plant/:plantId
router.patch("/:plantId", uploadImg.single("image"), plantController.patch);

//* DELETE /plant/:plantId
router.delete("/:plantId", plantController.delete);

export default router;
