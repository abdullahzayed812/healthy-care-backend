import { Router } from "express";
import { container } from "../../di/container";
import { PatientRecordController } from "../controller/PatientRecordController";
import { requireRole } from "../middlewares/role";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();
const controller = new PatientRecordController(container.patientRecordService);

router.get("/", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.getAll);
router.get("/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.getById);
router.get("/patients/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.getByPatient);
router.post("/patients/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.create);
router.delete("/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.delete);

export default router;
