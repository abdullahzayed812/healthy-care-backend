import { GetAllUsersResponse } from "../../core/dto/user.dto";
import { UserService } from "../../infrastructure/services/UserService";
import { handleErrorResponse } from "../../utils/errors/errorResponse";
import { ExpressHandler } from "../../utils/types/apis";

export class UserController {
  constructor(private userService: UserService) {}

  public getAll: ExpressHandler<{}, GetAllUsersResponse> = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json(users);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  public uploadAvatar: ExpressHandler<{}, { message: string; uploaded: boolean }, { id: string }> = async (
    req,
    res
  ) => {
    const userId = req.params.id;
    const file = req.file;

    try {
      const uploaded = await this.userService.upload(userId, file);

      res.status(201).json({ message: "Avatar uploaded successfully.", uploaded });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };
}
