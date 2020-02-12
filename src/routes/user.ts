import * as express from "express";
import { userController } from "../controller";

const router = express.Router();

//* GET /user/:userId
router.get("/:userId", userController.get);

//* PATCH /user
router.patch("/", userController.patch);

//* DELETE /user
router.delete("/", userController.delete);

export default router;
