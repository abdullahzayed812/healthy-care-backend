import { User, UserRole } from "../entities/User";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  role: UserRole;
}

export interface RegisterResponse {
  user: {
    id: number;
    email: string;
    username: string;
  };
  accessToken: string;
}
