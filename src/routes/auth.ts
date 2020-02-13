import * as express from "express";
import * as passport from "passport";
import * as authController from "../controller/auth";
import { isNotLoggedIn, isLoggedIn } from "../middlewares";

const router = express.Router();

// router.use(isNotLoggedIn);

// * POST /auth/signup
router.post("/signup", isNotLoggedIn, authController.signup);

// * POST  /auth/login
router.post("/login", isNotLoggedIn, authController.login);

// * POST /auth/logout
router.post(
  "/logout",
  isLoggedIn,
  passport.authenticate("jwt", { session: false }),
  authController.logout,
);

export default router;
