import * as express from "express";

const router = express.Router();
// console.log(typeof verifyToken, verifyToken);

const { userController } = require("../controller");

router.get("/:userName", userController.get);
router.post("/", userController.post);

export default router;
