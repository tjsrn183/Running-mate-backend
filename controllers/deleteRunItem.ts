import { Run } from "../models";
import { RequestHandler } from "express";

export const deleteRunItem: RequestHandler = async (req, res, next) => {
  try {
    const post = await Run.destroy({
      where: {
        runItemId: req.params.runItemId,
      },
    });

    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
