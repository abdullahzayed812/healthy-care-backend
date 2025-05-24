import { IRepository } from "./IRepository";
import { User } from "../../entities/User";
import { RegisterRequest } from "../../dto/auth.dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  uploadAvatar(userId: string, avatarPath: string): Promise<boolean>;
  create(data: RegisterRequest): Promise<User | null>;
}
