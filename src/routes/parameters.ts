import { Router } from "express";
import { parametersController } from "../controller";

const router = Router();

//* GET /parameters
router.get("/", parametersController.getAll);

//* POST&PATCH /parameters/plant/:plantId
router.post("/plant/:plantId", parametersController.postPlant);

//* GET /parameters/plant/:plantId
router.get("/plant/:plantId", parametersController.getPlant);

export default router;
