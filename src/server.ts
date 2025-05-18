import express from "express";
import cors from "cors";

import doctorRouter from "./presentation/routes/doctor.routes";
import authRouter from "./presentation/routes/auth.routes";
import appointmentRoutes from "./presentation/routes/appointment.routes";
import patientRecordRoutes from "./presentation/routes/patientRecord.routes";
import availabilityRoutes from "./presentation/routes/patient.routes";

import { errorHandlerMiddleware } from "./presentation/middlewares/errorHandler";
import { requestLoggerMiddleware } from "./presentation/middlewares/requestLogger";

export async function createServer(logRequests: boolean = true) {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  if (logRequests) {
    // log incoming Requests
    app.use(requestLoggerMiddleware);
  }

  // Routes
  app.use("/api/auth", authRouter);

  app.use("/api/doctors", doctorRouter);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/availability", availabilityRoutes);
  app.use("/api/records", patientRecordRoutes);

  // Error handler
  app.use(errorHandlerMiddleware);

  return app;
}
