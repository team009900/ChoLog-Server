import { Router } from "express";
import * as passport from "passport";
import { plantsdbController } from "../controller";

const router = Router();

//* GET /plantsdb/search?q=target
router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  plantsdbController.getSearch,
);

//* GET /plantsdb/:plantsDBId
router.get(
  "/:plantsDBId",
  passport.authenticate("jwt", { session: false }),
  plantsdbController.get,
);

export default router;
