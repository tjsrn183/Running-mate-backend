import { ChatRoom, Chat } from "../models";
import { RequestHandler } from "express";

export const createChatRoom: RequestHandler = async (req, res, next) => {
  try {
    const newRoom = await ChatRoom.create({
      title: req.body.title,
      max: req.body.max,
      owner: req.body.name,
      UserId: req.user?.user.dataValues.id,
      RunRunItemId: req.body.runItemId,
    });
    console.log(
      "chatControllers에서 실행한 req.user.user.dataValues.id임",
      req.user?.user.dataValues.id
    );
    const io = req.app.get("io");
    io.of("/room").emit("newRoom", newRoom);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const enterRoom: RequestHandler = async (req, res, next) => {
  try {
    const room = await ChatRoom.findOne({ where: { roomId: req.params.id } });
    if (!room) {
      return res.send("notExist");
    }

    const io = req.app.get("io");
    const { rooms } = io.of("/chat").adapter;
    if (room.max <= rooms.get(req.params.id)?.size) {
      return res.send("full");
    }
    const chat = await Chat.findAll({
      where: { ChatRoomRoomId: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    console.log("enterRoom컨트롤러에서 chat임", chat);
    res.send(chat);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
