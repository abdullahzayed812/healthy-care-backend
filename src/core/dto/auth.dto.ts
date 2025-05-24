import { User, UserRole } from "../entities/User";

export type GenderType = "male" | "female" | "child";

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
  specialty?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: GenderType;
}

export interface RegisterResponse {
  user: {
    id: number;
    email: string;
    username: string;
  };
  accessToken: string;
}
