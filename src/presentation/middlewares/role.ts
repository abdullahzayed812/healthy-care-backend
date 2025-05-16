import { Request, Response, NextFunction } from "express";

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.userId) {
      res.status(401).json({ error: "Unauthorized", details: "User not authenticated" });
      return;
    }

    if (!allowedRoles.includes(res.locals.role)) {
      res.status(403).json({ error: "Forbidden", details: `Requires role: ${allowedRoles.join(", ")}` });
      return;
    }

    next();
  };
}
