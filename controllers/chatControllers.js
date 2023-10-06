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
exports.sendChat = exports.removeRoom = exports.enterRoom = exports.createChatRoom = void 0;
const models_1 = require("../models");
const createChatRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newRoom = yield models_1.ChatRoom.create({
            title: req.body.title,
            max: req.body.max,
            owner: req.body.name,
            user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.dataValues.id,
        });
        const io = req.app.get("io");
        io.of("/room").emit("newRoom", newRoom);
        res.end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createChatRoom = createChatRoom;
const enterRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield models_1.ChatRoom.findOne({ where: { roomId: req.params.id } });
        if (!room) {
            return alert("존재하지 않는 방입니다.");
        }
        const io = req.app.get("io");
        const { rooms } = io.of("/chat").adapter;
        if (room.max <= rooms.get(req.params.id).size) {
            return alert("방이 꽉 찼습니다.");
        }
        const chat = yield models_1.Chat.findAll({
            where: { roomId: req.params.id },
            order: [["createdAt", "DESC"]],
        });
        res.send(chat);
        res.end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.enterRoom = enterRoom;
const removeRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.ChatRoom.destroy({ where: { roomId: req.params.id } });
        yield models_1.Chat.destroy({ where: { roomId: req.params.id } });
        res.end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.removeRoom = removeRoom;
const sendChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield models_1.Chat.create({
            roomId: parseInt(req.params.id),
            user: req.body.name,
            message: req.body.message,
        });
        req.app.get("io").of("/chat").to(req.params.id).emit("chat", chat);
        res.end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.sendChat = sendChat;
