import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import path from "node:path";

import doctorRouter from "./presentation/routes/doctor.routes";
import authRouter from "./presentation/routes/auth.routes";
import appointmentRoutes from "./presentation/routes/appointment.routes";
import patientRecordRoutes from "./presentation/routes/patientRecord.routes";
import availabilityRoutes from "./presentation/routes/availability.routes";
import userRouter from "./presentation/routes/user.routes";

import { errorHandlerMiddleware } from "./presentation/middlewares/errorHandler";
import { requestLoggerMiddleware } from "./presentation/middlewares/requestLogger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createServer(logRequests: boolean = true) {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  if (logRequests) {
    // log incoming Requests
    app.use(requestLoggerMiddleware);
  }

  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/doctors", doctorRouter);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/availability", availabilityRoutes);
  app.use("/api/records", patientRecordRoutes);

  // Error handler
  app.use(errorHandlerMiddleware);

  return app;
}
