import SocketIO, { Server } from "socket.io";
import http from "http";
import { removeRoom } from "./services";

export const socketFunc = (
  server: http.Server,
  app: any,
  sessionMiddleware: any
) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  const wrap = (middleware: any) => (socket: any, next: any) =>
    middleware(socket.request, {}, next);
  chat.use(wrap(sessionMiddleware));
  room.on("/connection", (socket) => {
    console.log("room 접속");
    socket.on("disconnect", () => {
      console.log("room 접속 해제");
    });
  });
  chat.on("/connection", (socket) => {
    console.log("chat 접속");
    socket.on("join", (data: number) => {
      socket.join(data);
      socket.to(data).emit("join", {
        user: "system",
        chat: `${socket.request.session.name}님이 접속하셨습니다.`,
      });
    });
    socket.on("disconnect", async (roomId: number) => {
      const roomIdString = roomId.toString();
      console.log("chat네임스페이스 연결해제");
      const { referer } = socket.request.headers;
      console.log("referer이다", referer);

      const currentRoom = chat.adapter.rooms.get(roomIdString!);
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
        await removeRoom(roomIdString!);
        room.emit("removeRoom", roomId);
        console.log("방 삭제요청 성공");
      } else {
        socket.to(roomId).emit("exit", {
          user: "system",
          chat: `${socket.request.session.name}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};
