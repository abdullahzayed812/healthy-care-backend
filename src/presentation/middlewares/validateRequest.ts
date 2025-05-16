import { Request, Response, NextFunction } from "express";

type Validator<T> = (body: any) => body is T;

function hasAllValues(body: any): boolean {
  return Object.values(body).every((value) => value !== undefined && value !== null && value !== "");
}

export function validateRequest<T>(validator: Validator<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validator(req.body)) {
      res.status(400).json({ error: "Invalid request structure" });
      return;
    }

    if (!hasAllValues(req.body)) {
      res.status(400).json({ error: "All fields are required and must not be empty" });
      return;
    }

    next();
  };
}
