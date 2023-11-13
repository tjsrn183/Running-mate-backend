import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { createChatRoom, enterRoom } from "../controllers/chatControllers";

const router = express.Router();

router.post("/room", isLoggedIn, createChatRoom);
router.get("/room/:id", isLoggedIn, enterRoom);

export default router;
