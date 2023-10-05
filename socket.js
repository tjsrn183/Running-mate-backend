"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketFunc = void 0;
const socket_io_1 = require("socket.io");
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
    });
};
exports.socketFunc = socketFunc;
