import * as express from "express";
import { userController } from "../controller";
import { uploadImg, deleteImg } from "../middlewares";

const router = express.Router();

//* GET /user/plants/
router.get("/plants", userController.plantsGet);

//* GET /user/:userId
router.get("/:userId", userController.get);

//* PATCH /user
router.patch("/", uploadImg.single("image"), userController.patch, deleteImg);

//* DELETE /user
router.delete("/", userController.delete);

export default router;
