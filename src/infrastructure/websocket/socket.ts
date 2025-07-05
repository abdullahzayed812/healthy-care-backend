import type { Server as SocketIOServer } from "socket.io";

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
