import { Router } from "express";
import { AppointmentController } from "../controller/AppointmentController";
import { container } from "../../di/container";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();
const controller = new AppointmentController(container.appointmentService);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.get("/doctors/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("doctor"), controller.getByDoctorId);
router.get(
  "/patients/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("patient"),
  controller.getByPatientId
);

export default router;
