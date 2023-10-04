import SocketIO, { Server } from "socket.io";
import http from "http";

export const socketFunc = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("New Client!  ", ip, socket.id);
    socket.on("disconnect", () => {
      console.log("Client Disconnected!", ip, socket.id);
    });
    socket.on("error", (error) => {
      console.error(error);
    });
    socket.on("reply", (data) => {
      console.log(data);
    });
  });
};
