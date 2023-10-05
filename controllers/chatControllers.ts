import { ChatRoom, Chat } from "../models";
import { RequestHandler } from "express";

export const createChatRoom: RequestHandler = async (req, res, next) => {
  try {
    const newRoom = await ChatRoom.create({
      title: req.body.title,
      max: req.body.max,
      owner: req.body.name,
    });

    const io = req.app.get("io");
    io.of("/room").emit("newRoom", newRoom);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const enterRoom: RequestHandler = async (req, res, next) => {
  try {
    const room = await ChatRoom.findOne({ where: { roomId: req.params.id } });
    if (!room) {
      return alert("존재하지 않는 방입니다.");
    }

    const io = req.app.get("io");
    const { rooms } = io.of("/chat").adapter;
    if (rooms.max <= rooms.get(req.params.id).size) {
      return alert("방이 꽉 찼습니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const removeRoom: RequestHandler = async (req, res, next) => {
  try {
    await ChatRoom.destroy({ where: { roomId: req.params.id } });
    await Chat.destroy({ where: { roomId: req.params.id } });
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
