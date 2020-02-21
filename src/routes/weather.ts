import * as express from "express";
import { weatherController } from "../controller";

const router = express.Router();

//* GET /weather
router.get("/", weatherController);

export default router;
