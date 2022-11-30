import { Router } from "express";
const router = Router();

import * as testController from "../controller/testController";

router.post("/save", testController.add);
router.get("/find", testController.fetch);
router.delete("/dataDelete", testController.remove);
router.put("/modify", testController.update);
export { router };
