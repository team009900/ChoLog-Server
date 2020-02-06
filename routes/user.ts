const express = require("express");

const router = express.Router();
// console.log(typeof verifyToken, verifyToken);

const { userController } = require("../controller");

router.get("/:userName", userController.get);
router.patch("/", userController.post);

module.exports = router;
