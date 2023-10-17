import { Run } from "../models";
import { RequestHandler } from "express";
import { removeRoom } from "../services";

export const deleteRunItem: RequestHandler = async (req, res, next) => {
  const runItemIdNum: number = parseInt(req.params.runItemId);
  try {
    const post = await Run.destroy({
      where: {
        runItemId: runItemIdNum,
      },
    });
    await removeRoom(runItemIdNum);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
