import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../core/dto/auth.dto";
import { AuthService } from "../../infrastructure/services/AuthService";
import { ExpressHandler } from "../../utils/types/apis";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login: ExpressHandler<LoginRequest, LoginResponse> = async (req, res) => {
    try {
      const token = await this.authService.login(req.body as LoginRequest);
      res.status(200).json({ token });
    } catch (error: any) {
      console.error("Error logging in:", error);
      res.status(400).json({ details: error.message });
    }
  };

  register: ExpressHandler<RegisterRequest, RegisterResponse> = async (req, res) => {
    try {
      const user = await this.authService.register(req.body as RegisterRequest);
      res.status(201).json({ user });
    } catch (error: any) {
      console.error("Error registering:", error);
      res.status(400).json({ details: error.message });
    }
  };
}
