"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketFunc = void 0;
const socket_io_1 = require("socket.io");
const models_1 = require("./models");
const socketFunc = (server, app) => {
    const io = new socket_io_1.Server(server, {
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
        socket.on("join", (data) => {
            console.log("join이벤트 실행됨");
            socket.join(data);
            socket.to(data).emit("join", {
                user: "system",
                chat: `${username}님이 접속하셨습니다.`,
            });
        });
        //
        socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const chatData = {
                user: data.user,
                message: data.message,
            };
            socket.to(data.roomId).emit("chat", chatData);
            const chat = yield models_1.Chat.create({
                ChatRoomRoomId: data.roomId,
                user: data.user,
                message: data.message,
            });
            console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
            console.log("sendChat컨트롤러에서 chat임", chatData);
            console.log("DATA에서 룸아이디임", data.roomId);
        }));
        const Interval = setInterval(() => {
            socket.emit("ping");
        }, 20000);
        //
        socket.on("disconnect", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
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
        }));
    });
};
exports.socketFunc = socketFunc;
