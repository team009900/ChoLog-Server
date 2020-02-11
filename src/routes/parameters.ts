import { Router } from "express";
import { parametersController } from "../controller";

const router = Router();

//* GET /parameters
router.get("/", parametersController.get);

//* POST /parameters/plant/:plantId
router.post("/plant/:plantId", parametersController.plant.post);

//* GET /parameters/plant/:plantId
router.get("/plant/:plantId", parametersController.plant.get);

//* PATCH /parameters/plant/:plantId
router.patch("/plant/:plantId", parametersController.plant.patch);

export default router;
