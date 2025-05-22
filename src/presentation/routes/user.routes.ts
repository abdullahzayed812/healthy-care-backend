import { Router } from "express";
import { upload } from "../middlewares/upload";
import { UserController } from "../controller/UserController";
import { container } from "../../di/container";

const router = Router();

const controller = new UserController(container.userService);

router.post("/:id/avatar", upload.single("avatar"), controller.uploadAvatar);

export default router;
