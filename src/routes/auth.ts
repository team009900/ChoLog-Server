import * as express from "express";

import * as authController from "../controller/auth";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

const router = express.Router();

// router.use(isNotLoggedIn);

// * POST /user/signup
router.post("/signup", isNotLoggedIn, authController.signup.post);

// * POST  /user/login
router.post("/login", isNotLoggedIn, authController.login.post);

// * POST /user/logout
router.post("/logout", isLoggedIn, authController.logout.post);

export default router;
