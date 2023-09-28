import { Run } from "../models";
import { RequestHandler } from "express";
import User from "../models/user";

export const getRunItem: RequestHandler = async (req, res, next) => {
  try {
    const getRunItemfunc = await Run.findOne({
      where: { runItemId: req.params.runItemId },
      include: { model: User, attributes: ["nick"] },
    });
    console.log("getRunItem에 runItem", getRunItemfunc);
    res.json(getRunItemfunc);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
