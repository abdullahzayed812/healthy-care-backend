import { IRepository } from "./IRepository";
import { User } from "../../entities/User";
import { RegisterRequest } from "../../dto/auth.dto";
import { GetAllUsersResponse } from "../../dto/user.dto";

export interface IUserRepository {
  findAll(): Promise<GetAllUsersResponse>;
  findByEmail(email: string): Promise<User | null>;
  findAllUsersWithDetails(): Promise<any[]>;
  uploadAvatar(userId: string, avatarPath: string): Promise<boolean>;
  create(data: RegisterRequest): Promise<User | null>;
}
