import { Router } from "express";
import { plantsdbController } from "../controller";

const router = Router();

//* GET /plantsdb/search?q=target
router.get("/search", plantsdbController.getSearch);

//* GET /plantsdb/:plantsDBId
router.get("/:plantsDBId", plantsdbController.get);

export default router;
