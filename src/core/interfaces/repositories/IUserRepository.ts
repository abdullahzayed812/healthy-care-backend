import { IRepository } from "./IRepository";
import { User } from "../../entities/User";

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  uploadAvatar(userId: string, avatarPath: string): Promise<boolean>;
}
