import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";

export function isLoginRequest(body: LoginRequest): body is LoginRequest {
  return typeof body === "object" && typeof body.email === "string" && typeof body.password === "string";
}

export function isRegisterRequest(body: RegisterRequest): body is RegisterRequest {
  return (
    typeof body === "object" &&
    typeof body.email === "string" &&
    typeof body.password === "string" &&
    typeof body.username === "string"
  );
}
