import { Server as SocketIOServer, Socket } from "socket.io";
import { AvailabilityService } from "../services/AvailabilityService";

import { Server as HTTPServer } from "http";

let io: SocketIOServer;

export function setSocketServer(server: SocketIOServer) {
  io = server;
}

export function getSocketServer(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.io server not initialized");
  }
  return io;
}

// export class AvailabilitySocketHandlers {
//   private io: SocketIOServer;
//   private availabilityService: AvailabilityService;

//   constructor(io: SocketIOServer, availabilityService: AvailabilityService) {
//     this.io = io;
//     this.availabilityService = availabilityService;
//   }

//   public handleConnection(socket: Socket) {
//     console.log(`Client connected: ${socket.id}`);

//     // Join doctor-specific rooms for targeted updates
//     socket.on("join:doctor-availability", (doctorId: number) => {
//       const room = `doctor-${doctorId}-availability`;
//       socket.join(room);
//       console.log(`Socket ${socket.id} joined room: ${room}`);
//     });

//     // Leave doctor-specific rooms
//     socket.on("leave:doctor-availability", (doctorId: number) => {
//       const room = `doctor-${doctorId}-availability`;
//       socket.leave(room);
//       console.log(`Socket ${socket.id} left room: ${room}`);
//     });

//     // Handle availability creation
//     socket.on("availability:create", async (data) => {
//       try {
//         const newAvailability = await this.availabilityService.create(data);

//         // Emit to all clients in the doctor's availability room
//         this.io.to(`doctor-${data.doctorId}-availability`).emit("availability:created", {
//           availability: newAvailability,
//           doctorId: data.doctorId,
//           timestamp: new Date().toISOString(),
//         });

//         // Also emit to general availability watchers
//         this.io.emit("availability:updated", {
//           type: "created",
//           doctorId: data.doctorId,
//           availability: newAvailability,
//           timestamp: new Date().toISOString(),
//         });

//         socket.emit("availability:create:success", newAvailability);
//       } catch (error: any) {
//         socket.emit("availability:create:error", {
//           message: "Failed to create availability",
//           error: error.message,
//         });
//       }
//     });

//     // Handle availability updates
//     socket.on("availability:update", async (data: { id: number; updates: any }) => {
//       try {
//         const success = await this.availabilityService.update(data.id, data.updates);

//         if (success) {
//           const updatedAvailability = await this.availabilityService.getById(data.id);

//           if (updatedAvailability) {
//             // Emit to doctor-specific room
//             this.io.to(`doctor-${updatedAvailability.doctorId}-availability`).emit("availability:updated-slot", {
//               availability: updatedAvailability,
//               timestamp: new Date().toISOString(),
//             });

//             // Emit to general watchers
//             this.io.emit("availability:updated", {
//               type: "updated",
//               availability: updatedAvailability,
//               timestamp: new Date().toISOString(),
//             });
//           }

//           socket.emit("availability:update:success", { id: data.id });
//         } else {
//           socket.emit("availability:update:error", {
//             message: "Availability not found or update failed",
//           });
//         }
//       } catch (error: any) {
//         socket.emit("availability:update:error", {
//           message: "Failed to update availability",
//           error: error.message,
//         });
//       }
//     });

//     // Handle availability deletion
//     socket.on("availability:delete", async (availabilityId: number) => {
//       try {
//         // Get the availability before deleting to know which doctor's room to notify
//         const availability = await this.availabilityService.getById(availabilityId);

//         if (!availability) {
//           socket.emit("availability:delete:error", {
//             message: "Availability not found",
//           });
//           return;
//         }

//         const success = await this.availabilityService.delete(availabilityId);

//         if (success) {
//           // Emit to doctor-specific room
//           this.io.to(`doctor-${availability.doctorId}-availability`).emit("availability:deleted", {
//             availabilityId,
//             doctorId: availability.doctorId,
//             timestamp: new Date().toISOString(),
//           });

//           // Emit to general watchers
//           this.io.emit("availability:updated", {
//             type: "deleted",
//             availabilityId,
//             doctorId: availability.doctorId,
//             timestamp: new Date().toISOString(),
//           });

//           socket.emit("availability:delete:success", { id: availabilityId });
//         } else {
//           socket.emit("availability:delete:error", {
//             message: "Failed to delete availability",
//           });
//         }
//       } catch (error: any) {
//         socket.emit("availability:delete:error", {
//           message: "Failed to delete availability",
//           error: error.message,
//         });
//       }
//     });

//     // Handle bulk availability creation
//     socket.on("availability:create-bulk", async (data) => {
//       try {
//         const result = await this.availabilityService.createBulk(data);

//         // Emit to all relevant doctor rooms
//         const doctorIds = [...new Set(data.availabilities.map((a: any) => a.doctorId))];

//         for (const doctorId of doctorIds) {
//           this.io.to(`doctor-${doctorId}-availability`).emit("availability:bulk-created", {
//             doctorId,
//             result,
//             timestamp: new Date().toISOString(),
//           });
//         }

//         // Emit general update
//         this.io.emit("availability:bulk-updated", {
//           type: "bulk-created",
//           doctorIds,
//           result,
//           timestamp: new Date().toISOString(),
//         });

//         socket.emit("availability:create-bulk:success", result);
//       } catch (error: any) {
//         socket.emit("availability:create-bulk:error", {
//           message: "Failed to create bulk availability",
//           error: error.message,
//         });
//       }
//     });

//     // Handle appointment booking (affects availability)
//     socket.on("appointment:book", async (appointmentData) => {
//       try {
//         // This would typically be handled by AppointmentService
//         // but we need to update availability status here
//         const { doctorId, dayOfWeek, startTime } = appointmentData;

//         // Find and update the corresponding availability slot
//         const availabilities = await this.availabilityService.getByDoctor(doctorId);
//         const targetAvailability = availabilities.find(
//           (slot) => slot.dayOfWeek === dayOfWeek && slot.startTime === startTime
//         );

//         if (targetAvailability) {
//           await this.availabilityService.update(targetAvailability.id, { booked: true });

//           // Emit real-time update
//           this.io.to(`doctor-${doctorId}-availability`).emit("availability:slot-booked", {
//             availabilityId: targetAvailability.id,
//             doctorId,
//             dayOfWeek,
//             startTime,
//             timestamp: new Date().toISOString(),
//           });

//           // Emit to general watchers
//           this.io.emit("availability:updated", {
//             type: "slot-booked",
//             doctorId,
//             availabilityId: targetAvailability.id,
//             timestamp: new Date().toISOString(),
//           });
//         }

//         socket.emit("appointment:book:success", appointmentData);
//       } catch (error: any) {
//         socket.emit("appointment:book:error", {
//           message: "Failed to book appointment",
//           error: error.message,
//         });
//       }
//     });

//     // Handle appointment cancellation (frees up availability)
//     socket.on("appointment:cancel", async (appointmentData) => {
//       try {
//         const { doctorId, dayOfWeek, startTime } = appointmentData;

//         // Find and update the corresponding availability slot
//         const availabilities = await this.availabilityService.getByDoctor(doctorId);
//         const targetAvailability = availabilities.find(
//           (slot) => slot.dayOfWeek === dayOfWeek && slot.startTime === startTime
//         );

//         if (targetAvailability) {
//           await this.availabilityService.update(targetAvailability.id, { booked: false });

//           // Emit real-time update
//           this.io.to(`doctor-${doctorId}-availability`).emit("availability:slot-freed", {
//             availabilityId: targetAvailability.id,
//             doctorId,
//             dayOfWeek,
//             startTime,
//             timestamp: new Date().toISOString(),
//           });

//           // Emit to general watchers
//           this.io.emit("availability:updated", {
//             type: "slot-freed",
//             doctorId,
//             availabilityId: targetAvailability.id,
//             timestamp: new Date().toISOString(),
//           });
//         }

//         socket.emit("appointment:cancel:success", appointmentData);
//       } catch (error: any) {
//         socket.emit("appointment:cancel:error", {
//           message: "Failed to cancel appointment",
//           error: error.message,
//         });
//       }
//     });

//     // Handle disconnect
//     socket.on("disconnect", () => {
//       console.log(`Client disconnected: ${socket.id}`);
//     });
//   }

//   // Method to broadcast availability changes from HTTP endpoints
//   public broadcastAvailabilityChange(type: string, data: any) {
//     switch (type) {
//       case "created":
//         this.io.to(`doctor-${data.doctorId}-availability`).emit("availability:created", data);
//         this.io.emit("availability:updated", { type: "created", ...data });
//         break;

//       case "updated":
//         this.io.to(`doctor-${data.doctorId}-availability`).emit("availability:updated-slot", data);
//         this.io.emit("availability:updated", { type: "updated", ...data });
//         break;

//       case "deleted":
//         this.io.to(`doctor-${data.doctorId}-availability`).emit("availability:deleted", data);
//         this.io.emit("availability:updated", { type: "deleted", ...data });
//         break;

//       case "slot-booked":
//         this.io.to(`doctor-${data.doctorId}-availability`).emit("availability:slot-booked", data);
//         this.io.emit("availability:updated", { type: "slot-booked", ...data });
//         break;

//       case "slot-freed":
//         this.io.to(`doctor-${data.doctorId}-availability`).emit("availability:slot-freed", data);
//         this.io.emit("availability:updated", { type: "slot-freed", ...data });
//         break;
//     }
//   }
// }

// export class SocketService {
//   private io: SocketIOServer;
//   private availabilityHandlers: AvailabilitySocketHandlers;

//   constructor(httpServer: HTTPServer, availabilityService: AvailabilityService) {
//     this.io = new SocketIOServer(httpServer, {
//       cors: {
//         origin: process.env.CLIENT_URL || "http://localhost:3000",
//         methods: ["GET", "POST"],
//         credentials: true,
//       },
//       transports: ["websocket", "polling"],
//     });

//     this.availabilityHandlers = new AvailabilitySocketHandlers(this.io, availabilityService);
//     this.setupEventHandlers();
//   }

//   private setupEventHandlers() {
//     this.io.on("connection", (socket) => {
//       this.availabilityHandlers.handleConnection(socket);
//     });
//   }

//   public getAvailabilityHandlers(): AvailabilitySocketHandlers {
//     return this.availabilityHandlers;
//   }

//   public getIO(): SocketIOServer {
//     return this.io;
//   }
// }
