"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const chatControllers_1 = require("../controllers/chatControllers");
const router = express_1.default.Router();
router.post("/room", middlewares_1.isLoggedIn, chatControllers_1.createChatRoom);
router.get("/room/:id", middlewares_1.isLoggedIn, chatControllers_1.enterRoom);
//router.delete("/room/:id", isLoggedIn, removeRoom);
//router.post("/room/:id/chat", isLoggedIn, sendChat);
exports.default = router;
