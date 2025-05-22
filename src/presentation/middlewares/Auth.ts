import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt";
import { User } from "../../core/entities/User";
import { UserRole } from "../../utils/types/userRole";

export interface AuthenticatedRes extends Response {
  user?: Pick<User, "id">;
}

export class AuthMiddleware {
  public static authenticate(req: Request, res: AuthenticatedRes, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Authorization token is required" });
      return;
    }

    try {
      const decoded = verifyToken(token);

      res.locals.userId = decoded?.id;
      res.locals.userEmail = decoded?.email;
      res.locals.userRole = decoded?.role;

      next();
    } catch (error: any) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  }

  public static requireRole(...allowedRoles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const role = res.locals.userRole;
      if (!res.locals.userId || !role) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      if (!allowedRoles.includes(role)) {
        res.status(403).json({
          error: "Forbidden",
          details: `Allowed roles: ${allowedRoles.join(", ")}`,
        });
        return;
      }

      next();
    };
  }
}
