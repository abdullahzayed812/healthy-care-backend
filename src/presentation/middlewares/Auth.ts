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

    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    res.locals.userId = decoded.userId;
    res.locals.userEmail = decoded.userEmail;
    res.locals.userRole = decoded.userRole;

    next();
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
