import { Router } from "express";
import { AppointmentController } from "../controller/AppointmentController";
import { container } from "../../di/container";
import { AuthMiddleware } from "../middlewares/Auth";
import { requestValidator } from "../middlewares/RequestValidator";
import {
  isCreateAppointmentRequest,
  isDoctorIdParams,
  isPatientIdParams,
  isUpdateAppointmentStatusParams,
  isUpdateAppointmentStatusRequest,
} from "../validators/appointmentValidator";

const router = Router();
const controller = new AppointmentController(container.appointmentService);

router.get(
  "/doctors/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("doctor", "patient"),
  requestValidator.validate({ params: isDoctorIdParams }),
  controller.getByDoctorId
);
router.get(
  "/patients/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("patient"),
  requestValidator.validate({ params: isPatientIdParams }),
  controller.getByPatientId
);

router.get("/", controller.getAll);
router.get(
  "/with-relations",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("admin"),
  controller.getAllWithRelations
);
router.post(
  "/",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("patient"),
  requestValidator.validate({ body: isCreateAppointmentRequest }),
  controller.create
);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.patch(
  "/:id/status",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("doctor", "admin"),
  requestValidator.validate({ body: isUpdateAppointmentStatusRequest, params: isUpdateAppointmentStatusParams }),
  controller.updateStatus
);
router.delete("/:id", controller.delete);

export default router;
