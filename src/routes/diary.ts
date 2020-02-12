import { Router } from "express";
import * as passport from "passport";
import { diaryController } from "../controller";

const router = Router();

//* POST /diary/:plantId
router.post(
  "/:plantId",
  passport.authenticate("jwt", { session: false }),
  diaryController.post,
);

//* GET  /diary/:diaryId
router.get(
  "/:diaryId",
  passport.authenticate("jwt", { session: false }),
  diaryController.get,
);

//* PATCH /diary/:diaryId
router.patch(
  "/:diaryId",
  passport.authenticate("jwt", { session: false }),
  diaryController.patch,
);

//* DELETE /diary/:diaryId
router.delete(
  "/:diaryId",
  passport.authenticate("jwt", { session: false }),
  diaryController.delete,
);

export default router;
