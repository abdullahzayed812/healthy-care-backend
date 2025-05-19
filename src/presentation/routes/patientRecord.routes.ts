import { Router } from "express";
import { container } from "../../di/container";
import { PatientRecordController } from "../controller/PatientRecordController";
import { AuthMiddleware } from "../middlewares/Auth";

const router = Router();
const controller = new PatientRecordController(container.patientRecordService);

router.get("/", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.getAll);
router.get("/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.getById);
router.delete("/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.delete);

router.get("/patients/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.getByPatient);
router.post("/patients/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.create);

export default router;
