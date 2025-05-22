import jwt, { SignOptions } from "jsonwebtoken";
import { UnauthorizedError } from "./errors/Errors";

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export function signAccessToken(payload: JwtPayload, expiresIn?: number): string {
  const options: SignOptions = { expiresIn: expiresIn ?? "1d" };
  return jwt.sign(payload, getJwtSecret(), options);
}

export function signRefreshToken(payload: JwtPayload, expiresIn?: number): string {
  const options: SignOptions = { expiresIn: expiresIn ?? "7d" };
  return jwt.sign(payload, getJwtSecret(), options); // Refresh token expires in 7 days
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (typeof decoded === "object") {
      return decoded as JwtPayload;
    }

    return null;
  } catch (error: any) {
    throw new UnauthorizedError(error.message);
  }
}

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("Missing Jwt secret.");
    process.exit(1);
  }

  return secret;
}
