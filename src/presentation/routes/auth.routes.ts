import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { container } from "../../di/container";
import { requestValidator } from "../middlewares/RequestValidator";
import { isLoginRequest, isRegisterRequest } from "../validators/authValidators";

const router = Router();

const authController = new AuthController(container.authService);

router.post("/login", requestValidator.validate({ body: isLoginRequest }), authController.login);
router.post("/register", requestValidator.validate({ body: isRegisterRequest }), authController.register);

export default router;
