import express from "express";
import http from "node:http";
import cors from "cors";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Server as SocketIOServer } from "socket.io";

import doctorRouter from "./presentation/routes/doctor.routes";
import authRouter from "./presentation/routes/auth.routes";
import appointmentRoutes from "./presentation/routes/appointment.routes";
import patientRecordRoutes from "./presentation/routes/patientRecord.routes";
import availabilityRoutes from "./presentation/routes/availability.routes";
import userRouter from "./presentation/routes/user.routes";

import { errorHandlerMiddleware } from "./presentation/middlewares/errorHandler";
import { requestLoggerMiddleware } from "./presentation/middlewares/requestLogger";
import { setSocketServer } from "./infrastructure/websocket/socket";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = ["http://localhost:8080", "http://192.168.0.128:8080"];

export async function createServer(logRequests: boolean = true) {
  const app = express();

  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );
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

  // Create HTTP and WebSocket servers
  const httpServer = http.createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  // Make `io` accessible to your app
  setSocketServer(io);

  return { httpServer, io };
}
