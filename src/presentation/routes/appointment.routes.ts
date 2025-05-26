import { Router } from "express";
import { AppointmentController } from "../controller/AppointmentController";
import { container } from "../../di/container";
import { AuthMiddleware } from "../middlewares/Auth";
import { requestValidator } from "../middlewares/RequestValidator";
import { isCreateAppointmentRequest, isDoctorIdParams, isPatientIdParams } from "../validators/appointmentValidator";

const router = Router();
const controller = new AppointmentController(container.appointmentService);

router.get(
  "/doctors/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("doctor"),
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
router.post(
  "/",
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("patient"),
  requestValidator.validate({ body: isCreateAppointmentRequest }),
  controller.create
);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
