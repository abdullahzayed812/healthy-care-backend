import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";
import { User } from "../../core/entities/User";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "../../utils/errors/Errors";
import { signAccessToken, signRefreshToken, verifyToken } from "../../utils/jwt";
import { UserRepository } from "../database/repositories/UserRepository";
import bcrypt from "bcrypt";

export class AuthService {
  private userRepo: UserRepository;

  constructor(authRepo: UserRepository) {
    this.userRepo = authRepo;
  }

  async login(request: LoginRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, password } = request;

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundError("User not found", "USER_NOT_FOUND");

    const passwordMatch = await bcrypt.compare(password, user.password as string);
    if (!passwordMatch) throw new UnauthorizedError("Invalid password", "INVALID_PASSWORD");

    const accessToken = signAccessToken({ id: user.id.toString(), email: user.email, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id.toString(), email: user.email, role: user.role });

    return { user: user.toSafeObject(), accessToken, refreshToken };
  }

  async register(request: RegisterRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, password, username, role, specialty, bio, dateOfBirth, gender } = request;

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new ConflictError("User already exists", "USER_EXISTS");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepo.create({
      email,
      password: hashedPassword,
      username,
      role,
      specialty,
      bio,
      dateOfBirth,
      gender,
    });

    if (!newUser) throw new BadRequestError("User could not be created", "USER_CREATION_FAILED");

    const accessToken = signAccessToken({ id: newUser.id.toString(), email: newUser.email, role: newUser.role });
    const refreshToken = signRefreshToken({ id: newUser.id.toString(), email: newUser.email, role: newUser.role });

    return { user: newUser, accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = verifyToken(refreshToken);

    if (!decoded) throw new UnauthorizedError("Invalid or expired refresh token", "INVALID_REFRESH_TOKEN");

    const user = await this.userRepo.findByEmail(decoded.email);
    if (!user) throw new NotFoundError("User not found", "USER_NOT_FOUND");

    const newAccessToken = signAccessToken({ id: user.id.toString(), email: user.email, role: user.role });
    const newRefreshToken = signRefreshToken({ id: user.id.toString(), email: user.email, role: user.role });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
