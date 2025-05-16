import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";
import { User } from "../../core/entities/User";
import { signToken } from "../../utils/jwt";
import { AuthRepository } from "../database/repositories/AuthRepository";
import bcrypt from "bcrypt";

export class AuthService {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async login(request: LoginRequest): Promise<string> {
    const { email, password } = request;

    const user = await this.authRepo.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = bcrypt.compare(password, user.password as string);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = signToken({ id: user.id, email: user.email });

    return token;
  }

  async register(request: RegisterRequest): Promise<User> {
    const { email, password, firstName, lastName } = request;

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
    } as Omit<User, "id">);

    return newUser;
  }
}
