import SocketIO, { Server } from "socket.io";
import http from "http";
import { removeRoom } from "./services";
import { Chat } from "./models";

export const socketFunc = (server: http.Server, app: any) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST"],
    },

    allowEIO3: true,
  });
  app.set("io", io);
  const roomIO = io.of("/room");
  const chatIO = io.of("/chat");

  roomIO.on("connection", (socket) => {
    console.log("room 접속");
    socket.on("disconnect", () => {
      console.log("room 접속 해제");
    });
  });
  chatIO.on("connection", (socket) => {
    const username = socket.handshake.query.username;
    console.log("username임", username);
    console.log("chat 접속");

    console.log("socket.id임", socket.id);
    socket.on("join", (data: string) => {
      console.log("join이벤트 실행됨");
      socket.join(data);
      socket.to(data).emit("join", {
        user: "system",
        chat: `${username}님이 접속하셨습니다.`,
      });
    });
    //
    socket.on("message", async (data: any) => {
      const chatData = {
        user: data.user,
        message: data.message,
      };
      socket.to(data.roomId).emit("chat", chatData);
      const chat = await Chat.create({
        ChatRoomRoomId: data.roomId,
        user: data.user,
        message: data.message,
      });

      console.log(
        "ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ"
      );

      console.log("sendChat컨트롤러에서 chat임", chatData);
      console.log("DATA에서 룸아이디임", data.roomId);
    });
    const Interval = setInterval(() => {
      socket.emit("ping");
    }, 20000);

    //
    socket.on("disconnect", async (roomId: string) => {
      clearInterval(Interval);
      socket.to(roomId).emit("leave", {
        user: "system",
        chat: `${username}님이 퇴장하셨습니다.`,
      });
      console.log("chat네임스페이스 연결해제");

      /*  const currentRoom = chatIO.adapter.rooms.get(roomId);
       const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
      await removeRoom(roomId);
        roomIO.emit("removeRoom", roomId);
       console.log("방 삭제요청 성공");
       } else {
        socket.to(roomId).emit("exit", {
          user: "system",
         chat: `${username}님이 퇴장하셨습니다.`,
        });
      } */
    });
  });
};
