import { Response } from "express";

export const handleErrorResponse = (res: Response, error: any) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  const code = error.code || "INTERNAL_SERVER_ERROR";

  console.error(`[${status}] ${code}: ${message}`);

  return res.status(status).json({
    error: {
      code,
      message,
    },
  });
};
