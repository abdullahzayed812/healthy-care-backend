import { HttpError } from "./HttpError";

export class DatabaseError extends HttpError {
  constructor(message = "A database error occurred", code = "DATABASE_ERROR") {
    super(message, 500, code);
  }
}
