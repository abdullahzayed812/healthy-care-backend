import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  userRole: string;
}

export function signToken(payload: object, expiresIn?: number): string {
  const options: SignOptions = { expiresIn: expiresIn ?? "1d" };
  return jwt.sign(payload, getJwtSecret(), options);
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (typeof decoded === "object") {
      return decoded as JwtPayload;
    }
    return null;
  } catch (error) {
    return null;
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
