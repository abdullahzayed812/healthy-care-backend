import { Router } from "express";
import { container } from "../../di/container";
import { PatientController } from "../controller/PatientController";

const router = Router();
const controller = new PatientController(container.patientService);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
// router.get('/search/by-name', controller.searchByName);

export default router;
