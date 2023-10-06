import { Run } from "../models";
import { RequestHandler } from "express";
import User from "../models/user";
import ChatRoom from "../models/chatRoom";

export const getRunItem: RequestHandler = async (req, res, next) => {
  try {
    const getRunItemfunc = await Run.findOne({
      where: { runItemId: req.params.runItemId },
      include: { model: ChatRoom, attributes: ["roomId"] },
    });
    console.log("getRunItem에 runItem", getRunItemfunc);
    res.json(getRunItemfunc);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
