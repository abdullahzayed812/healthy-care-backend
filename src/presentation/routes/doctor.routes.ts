import { Router } from "express";
import { DoctorController } from "../controller/DoctorController";
import { container } from "../../di/container";

const router = Router();
const controller = new DoctorController(container.doctorService);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
