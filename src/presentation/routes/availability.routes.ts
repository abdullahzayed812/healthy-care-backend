import { Router } from "express";
import { AvailabilityController } from "../controller/AvailabilityController";
import { container } from "../../di/container";
import { AuthMiddleware } from "../middlewares/Auth";
import { requestValidator } from "../middlewares/RequestValidator";
import {
  isCreateAvailabilityRequest,
  isAvailabilityParams,
  isUpdateAvailabilityRequest,
} from "../validators/availabilityValidators";

const router = Router();

const controller = new AvailabilityController(container.availabilityService);

router.get("/", AuthMiddleware.authenticate, AuthMiddleware.requireRole("admin"), controller.getAll);
router.post(
  "/",
  requestValidator.validate({ body: isCreateAvailabilityRequest }),
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("doctor"),
  controller.create
);
router.get(
  "/:id",
  requestValidator.validate({ params: isAvailabilityParams }),
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("doctor", "patient"),
  controller.getById
);
router.put(
  "/:id",
  requestValidator.validate({ params: isAvailabilityParams, body: isUpdateAvailabilityRequest }),
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("doctor"),
  controller.update
);
router.delete(
  "/:id",
  requestValidator.validate({ params: isAvailabilityParams }),
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("doctor"),
  controller.delete
);
router.get(
  "/doctors/:id",
  requestValidator.validate({ params: isAvailabilityParams }),
  AuthMiddleware.authenticate,
  AuthMiddleware.requireRole("patient"),
  controller.getByDoctor
);

export default router;
