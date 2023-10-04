"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketFunc = void 0;
const socket_io_1 = require("socket.io");
const socketFunc = (server) => {
    const io = new socket_io_1.Server(server, {
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
        setInterval(() => {
            socket.emit("reply", "안녀어어어엉");
        }, 3000);
    });
};
exports.socketFunc = socketFunc;
