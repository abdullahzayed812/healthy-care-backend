import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { container } from "../../di/container";
import { validateRequest } from "../middlewares/validateRequest";
import { isLoginRequest, isRegisterRequest } from "../validators/authValidators";
import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";

const router = Router();

const authController = new AuthController(container.authService);

router.post("/login", validateRequest<LoginRequest>(isLoginRequest), authController.login);
router.post("/register", validateRequest<RegisterRequest>(isRegisterRequest), authController.register);

export default router;
