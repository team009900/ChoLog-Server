import { Router } from "express";
import * as passport from "passport";
import { plantController } from "../controller";

const router = Router();

//* POST /plant
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  plantController.post,
);

//* GET /plant/:plantId
router.get(
  "/:plantId",
  passport.authenticate("jwt", { session: false }),
  plantController.get,
);

//* PATCH /plant/:plantId
router.patch(
  "/:plantId",
  passport.authenticate("jwt", { session: false }),
  plantController.patch,
);

//* DELETE /plant/:plantId
router.delete(
  "/:plantId",
  passport.authenticate("jwt", { session: false }),
  plantController.delete,
);

export default router;
