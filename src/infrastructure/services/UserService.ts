import { GetAllUsersResponse } from "../../core/dto/user.dto";
import { IUserRepository } from "../../core/interfaces/repositories/IUserRepository";
import { BadRequestError } from "../../utils/errors/Errors";

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  public async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await this.userRepo.findAllUsersWithDetails();

    const doctors: any[] = [];
    const patients: any[] = [];
    const admin: any[] = [];

    for (const user of users) {
      if (user.role === "doctor") {
        doctors.push({
          id: user.id,
          email: user.email,
          username: user.username,
          phoneNumber: user.phone_number,
          created_at: user.created_at,
          updated_at: user.updated_at,
          specialty: user.specialty,
          bio: user.bio,
          experience: user.experience,
          reviews: user.reviews,
        });
      } else if (user.role === "patient") {
        patients.push({
          id: user.id,
          email: user.email,
          username: user.username,
          phoneNumber: user.phone_number,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          dateOfBirth: user.date_of_birth,
          gender: user.gender,
        });
      } else if (user.role === "admin") {
        admin.push({
          id: user.id,
          email: user.email,
          username: user.username,
          phoneNumber: user.phone_number,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        });
      }
    }

    return { doctors, patients, admin };
  }

  public async upload(userId: string, file: Express.Multer.File | undefined): Promise<boolean> {
    if (!file) {
      throw new BadRequestError("No file uploaded");
    }

    const avatarPath = `/uploads/${file.filename}`;

    return await this.userRepo.uploadAvatar(userId, avatarPath);
  }
}
