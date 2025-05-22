import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";
import { ValidatorReturnType } from "../../utils/types/validators";

export function isLoginRequest(body: LoginRequest): ValidatorReturnType<LoginRequest> {
  const expected: LoginRequest = { email: "abcd@example.com", password: "1234" };

  if (typeof body !== "object" || typeof body.email !== "string" || typeof body.password !== "string") {
    return {
      error: "Invalid request body structure for LoginRequest.",
      expected,
    };
  }

  return true;
}

export function isRegisterRequest(body: RegisterRequest): ValidatorReturnType<RegisterRequest> {
  const expected: RegisterRequest = {
    email: "abcd@example.com",
    password: "1234",
    username: "ahmed ali",
    role: "doctor",
  };

  if (
    typeof body !== "object" ||
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    typeof body.username !== "string" ||
    typeof body.role !== "string"
  ) {
    return {
      error: "Invalid request body structure for LoginRequest.",
      expected,
    };
  }

  return true;
}
