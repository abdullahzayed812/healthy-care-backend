import { UserService } from "../../infrastructure/services/UserService";
import { handleErrorResponse } from "../../utils/errors/errorResponse";
import { ExpressHandler } from "../../utils/types/apis";

export class UserController {
  constructor(private userService: UserService) {}

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
