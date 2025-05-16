import { Router } from "express";
import { AvailabilityController } from "../controller/AvailabilityController";
import { container } from "../../di/container";

const router = Router();

const controller = new AvailabilityController(container.availabilityService);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/doctors/:id", controller.getByDoctor);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
