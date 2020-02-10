import * as express from "express";
import { userController } from "../controller";
// console.log(typeof verifyToken, verifyToken);

const router = express.Router();

//* GET /user/:userId
router.get("/:userId", userController.get);

//* PATCH /user
router.patch("/", userController.patch);

//* DELETE /user
router.delete("/", userController.delete);

export default router;
