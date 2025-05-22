import { Request, Response, NextFunction } from "express";

type Validator<T> = (input: any) => true | { error: string; expected: Partial<T> };

interface ValidationSchema {
  body?: Validator<any>;
  params?: Validator<any>;
}

class RequestValidator {
  private static instance: RequestValidator;

  private constructor() {}

  static getInstance(): RequestValidator {
    if (!RequestValidator.instance) {
      RequestValidator.instance = new RequestValidator();
    }
    return RequestValidator.instance;
  }

  validate(schema: ValidationSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors: string[] = [];

      if (schema.body) {
        const result = schema.body(req.body);
        if (result !== true) {
          errors.push(result.error);
          res.status(400).json({
            error: result.error,
            expected: result.expected,
          });
          return;
        }

        const missing = this.getMissingKeys(req.body);
        if (missing.length > 0) {
          errors.push(`Missing or empty body fields: ${missing.join(", ")}`);
        }
      }

      if (schema.params) {
        const result = schema.params(req.params);
        if (result !== true) {
          errors.push(result.error);
          res.status(400).json({
            error: result.error,
            expected: result.expected,
          });
          return;
        }

        const missing = this.getMissingKeys(req.params);
        if (missing.length > 0) {
          errors.push(`Missing or empty URL query params: ${missing.join(", ")}`);
        }
      }

      if (errors.length > 0) {
        res.status(400).json({ error: errors });
        return;
      }

      next();
    };
  }

  private getMissingKeys(obj: any): string[] {
    if (!obj || typeof obj !== "object") return [];
    return Object.keys(obj).filter((key) => obj[key] === undefined || obj[key] === null || obj[key] === "");
  }
}

export const requestValidator = RequestValidator.getInstance();
