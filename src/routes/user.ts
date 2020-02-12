import * as express from "express";
import * as passport from "passport";
// import "../passport/localStrategy";
import { userController } from "../controller";
// console.log(typeof verifyToken, verifyToken);

const router = express.Router();

//* GET /user/:userId
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.get,
);

//* PATCH /user
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.patch,
);

//* DELETE /user
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.delete,
);

export default router;
