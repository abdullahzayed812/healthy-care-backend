import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";
import { User } from "../../core/entities/User";
import { signAccessToken, signRefreshToken, verifyToken } from "../../utils/jwt";
import { AuthRepository } from "../database/repositories/AuthRepository";
import bcrypt from "bcrypt";

export class AuthService {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async login(request: LoginRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, password } = request;

    const user = await this.authRepo.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password as string);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    return { user, accessToken, refreshToken };
  }

  async register(request: RegisterRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, password, firstName, lastName, role } = request;

    const existingUser = await this.authRepo.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.authRepo.createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    } as Omit<User, "id">);

    if (!newUser) {
      throw new Error("User not created.");
    }

    const accessToken = signAccessToken({ id: newUser.id, email: newUser.email });
    const refreshToken = signRefreshToken({ id: newUser.id, email: newUser.email });

    return { user: newUser, accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      throw new Error("Invalid or expired refresh token");
    }

    const user = await this.authRepo.findByEmail(decoded.userEmail);
    if (!user) {
      throw new Error("User not found");
    }

    const newAccessToken = signAccessToken({ id: user.id, email: user.email });
    const newRefreshToken = signRefreshToken({ id: user.id, email: user.email });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
