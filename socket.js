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
const indes_1 = require("./services/indes");
const socketFunc = (server, app, sessionMiddleware) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    app.set("io", io);
    const room = io.of("/room");
    const chat = io.of("/chat");
    const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
    chat.use(wrap(sessionMiddleware));
    room.on("/connection", (socket) => {
        console.log("room 접속");
        socket.on("disconnect", () => {
            console.log("room 접속 해제");
        });
    });
    chat.on("/connection", (socket) => {
        console.log("chat 접속");
        socket.on("join", (data) => {
            socket.join(data);
            socket.to(data).emit("join", {
                user: "system",
                chat: `${socket.request.session.name}님이 접속하셨습니다.`,
            });
        });
        socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("chat네임스페이스 연결해제");
            const { referer } = socket.request.headers;
            console.log("referer이다", referer);
            const roomId = new URL(referer).pathname.split("/").at(-1);
            const currentRoom = chat.adapter.rooms.get(roomId);
            const userCount = (currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.size) || 0;
            if (userCount === 0) {
                yield (0, indes_1.removeRoom)(roomId);
                room.emit("removeRoom", roomId);
                console.log("방 삭제요청 성공");
            }
            else {
                socket
                    .to(roomId)
                    .emit("exit", {
                    user: "system",
                    chat: `${socket.request.session.name}님이 퇴장하셨습니다.`,
                });
            }
        }));
    });
};
exports.socketFunc = socketFunc;
