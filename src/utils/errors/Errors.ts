import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", code = "BAD_REQUEST") {
    super(message, 400, code);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", code = "UNAUTHORIZED") {
    super(message, 401, code);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden", code = "FORBIDDEN") {
    super(message, 403, code);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", code = "NOT_FOUND") {
    super(message, 404, code);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict", code = "CONFLICT") {
    super(message, 409, code);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message = "Unprocessable Entity", code = "UNPROCESSABLE_ENTITY") {
    super(message, 422, code);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error", code = "INTERNAL_SERVER_ERROR") {
    super(message, 500, code);
  }
}
