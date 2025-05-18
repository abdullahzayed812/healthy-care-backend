import { Router } from "express";
import { AvailabilityController } from "../controller/AvailabilityController";
import { container } from "../../di/container";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

const controller = new AvailabilityController(container.availabilityService);

router.get("/doctors/:id", AuthMiddleware.authenticate, AuthMiddleware.requireRole("patient"), controller.getByDoctor);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
