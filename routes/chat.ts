import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import {
  createChatRoom,
  enterRoom,
  removeRoom,
  sendChat,
} from "../controllers/chatControllers";

const router = express.Router();

router.post("/room", isLoggedIn, createChatRoom);
router.get("/room/:id", isLoggedIn, enterRoom);
router.delete("/room/:id", isLoggedIn, removeRoom);
router.post("/room/:id/chat", sendChat);

export default router;
