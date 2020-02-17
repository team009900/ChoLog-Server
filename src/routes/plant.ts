import { Router } from "express";
import { plantController } from "../controller";

const router = Router();

//* POST /plant
router.post("/", plantController.post);

//* GET /plant/:plantId
router.get("/:plantId", plantController.get);

//* PATCH /plant/:plantId
router.patch("/:plantId", plantController.patch);

//* DELETE /plant/:plantId
router.delete("/:plantId", plantController.delete);

//* getDiary /plant/diaries?id=plantId&month=month
router.get("/diaries", plantController.diaryGet);

export default router;
