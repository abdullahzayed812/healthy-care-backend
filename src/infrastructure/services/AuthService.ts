import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";
import { User } from "../../core/entities/User";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "../../utils/errors/Errors";
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
    if (!user) throw new NotFoundError("User not found", "USER_NOT_FOUND");

    const passwordMatch = await bcrypt.compare(password, user.password as string);
    if (!passwordMatch) throw new UnauthorizedError("Invalid password", "INVALID_PASSWORD");

    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    return { user: user.toSafeObject(), accessToken, refreshToken };
  }

  async register(request: RegisterRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, password, username, role } = request;

    const existingUser = await this.authRepo.findByEmail(email);
    if (existingUser) throw new ConflictError("User already exists", "USER_EXISTS");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.authRepo.createUser({
      email,
      password: hashedPassword,
      username,
      role,
    } as Omit<User, "id">);

    if (!newUser) throw new BadRequestError("User could not be created", "USER_CREATION_FAILED");

    const accessToken = signAccessToken({ id: newUser.id, email: newUser.email });
    const refreshToken = signRefreshToken({ id: newUser.id, email: newUser.email });

    return { user: newUser, accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = verifyToken(refreshToken);

    if (!decoded) throw new UnauthorizedError("Invalid or expired refresh token", "INVALID_REFRESH_TOKEN");

    const user = await this.authRepo.findByEmail(decoded.userEmail);
    if (!user) throw new NotFoundError("User not found", "USER_NOT_FOUND");

    const newAccessToken = signAccessToken({ id: user.id, email: user.email });
    const newRefreshToken = signRefreshToken({ id: user.id, email: user.email });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
