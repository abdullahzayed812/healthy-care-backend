import { Router } from "express";
import { upload } from "../middlewares/upload";
import { UserController } from "../controller/UserController";
import { container } from "../../di/container";
import { AuthMiddleware } from "../middlewares/Auth";

const router = Router();

const controller = new UserController(container.userService);

router.get("/all", AuthMiddleware.authenticate, AuthMiddleware.requireRole("admin"), controller.getAll);
router.post("/:id/avatar", upload.single("avatar"), controller.uploadAvatar);

export default router;
