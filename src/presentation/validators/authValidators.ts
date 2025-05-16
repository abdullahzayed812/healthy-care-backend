import { LoginRequest, RegisterRequest } from "../../core/dto/auth.dto";

export function isLoginRequest(body: any): body is LoginRequest {
  return typeof body === "object" && typeof body.email === "string" && typeof body.password === "string";
}

export function isRegisterRequest(body: any): body is RegisterRequest {
  return (
    typeof body === "object" &&
    typeof body.email === "string" &&
    typeof body.password === "string" &&
    typeof body.firstName === "string" &&
    typeof body.lastName === "string"
  );
}
