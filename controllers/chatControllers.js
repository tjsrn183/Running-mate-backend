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
exports.enterRoom = exports.createChatRoom = void 0;
const models_1 = require("../models");
const createChatRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newRoom = yield models_1.ChatRoom.create({
            title: req.body.title,
            max: req.body.max,
            owner: req.body.name,
            UserId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.dataValues.id,
            RunRunItemId: req.body.runItemId,
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
    var _b;
    try {
        const room = yield models_1.ChatRoom.findOne({ where: { roomId: req.params.id } });
        if (!room) {
            return res.send("notExist");
        }
        const io = req.app.get("io");
        const { rooms } = io.of("/chat").adapter;
        if (room.max <= ((_b = rooms.get(req.params.id)) === null || _b === void 0 ? void 0 : _b.size)) {
            return res.send("full");
        }
        const chat = yield models_1.Chat.findAll({
            where: { ChatRoomRoomId: req.params.id },
            order: [["createdAt", "ASC"]],
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
