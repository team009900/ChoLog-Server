import { Router } from "express";
import * as passport from "passport";
import { parametersController } from "../controller";

const router = Router();

//* GET /parameters
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  parametersController.get,
);

//* POST /parameters/plant/:plantId
router.post(
  "/plant/:plantId",
  passport.authenticate("jwt", { session: false }),
  parametersController.plant.post,
);

//* GET /parameters/plant/:plantId
router.get(
  "/plant/:plantId",
  passport.authenticate("jwt", { session: false }),
  parametersController.plant.get,
);

//* PATCH /parameters/plant/:plantId
router.patch(
  "/plant/:plantId",
  passport.authenticate("jwt", { session: false }),
  parametersController.plant.patch,
);

export default router;
