import { IUserRepository } from "../../core/interfaces/repositories/IUserRepository";
import { BadRequestError } from "../../utils/errors/Errors";

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  public async upload(userId: string, file: Express.Multer.File | undefined): Promise<boolean> {
    if (!file) {
      throw new BadRequestError("No file uploaded");
    }

    const avatarPath = `/uploads/${file.filename}`;

    return await this.userRepo.uploadAvatar(userId, avatarPath);
  }
}
